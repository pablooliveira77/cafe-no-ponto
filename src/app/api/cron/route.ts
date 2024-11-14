import { NextRequest, NextResponse } from "next/server";
import cron from "node-cron";

// Dicionário para armazenar jobs agendados por assinatura
const jobs: Record<string, cron.ScheduledTask> = {};

export async function GET() {
  return NextResponse.json({
    message: "API de agendamento",
    jobs: Object.keys(jobs),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    id_recorrencia,
    data_semana,
    horario_agendamento,
    data_limite,
    fk_id_pedido,
  } = body;

  // await fetch(process.env.AUTH0_BASE_URL + "/api/email", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ id_pedido: fk_id_pedido, tipo: "agendado" }),
  // });

  // Itera por cada horário e cria o job com a expressão cron
  horario_agendamento.forEach((horario: string) => {
    const [hour, minute] = horario.split(":");
    console.log("Agendando para", hour, minute);
    

    // Calcula o horário 30 minutos antes
    const preMinute = parseInt(minute, 10) - 30;
    const preHour = preMinute < 0 ? parseInt(hour, 10) - 1 : parseInt(hour, 10);
    const adjustedMinute = (preMinute + 60) % 60;
    console.log("Agendamento para", preHour, adjustedMinute);
    

    // Cria a expressão cron para o horário e o horário 30 minutos antes
    const cronExpression = `${minute} ${hour} * * ${data_semana.join(",")}`;
    const preCronExpression = `${adjustedMinute} ${preHour} * * ${data_semana.join(
      ","
    )}`;

    // Cadastra o job para o agendamento específico com verificação de data_limite
    const mainjob = cron.schedule(cronExpression, async () => {
      const currentDate = new Date();
      const limitDate = new Date(data_limite);

      // Verifica se a data atual passou da data_limite
      if (currentDate > limitDate) {
        console.log(
          `Agendamento ${id_recorrencia} cancelado pois ultrapassou a data limite.`
        );
        mainjob.stop();
        prejob.stop();
        delete jobs[id_recorrencia];
      } else {
        console.log(
          `Pedido a caminho ${fk_id_pedido} da recorrencia ${id_recorrencia} às ${hour}:${minute}`
        );
        await fetch(process.env.AUTH0_BASE_URL + "/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_pedido: fk_id_pedido, tipo: "caminho" }),
        });
      }
    });

    // Cadastra o job para 30 minutos antes
    const prejob = cron.schedule(preCronExpression, async () => {
      const currentDate = new Date();
      const limitDate = new Date(data_limite);

      // Verifica se a data atual passou da data_limite
      if (currentDate > limitDate) {
        console.log(
          `Agendamento ${id_recorrencia} cancelado pois ultrapassou a data limite.`
        );
        mainjob.stop();
        prejob.stop();
        delete jobs[id_recorrencia];
      } else {
        console.log(
          `Pedido ${fk_id_pedido} sendo preparado, recorrencia ${id_recorrencia} às ${preHour}:${adjustedMinute}`
        );
        await fetch(process.env.AUTH0_BASE_URL + "/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_pedido: fk_id_pedido, tipo: "preparando" }),
        });
      }
    });

    // Armazena os jobs no dicionário com chaves únicas
    jobs[`${id_recorrencia}-main`] = mainjob;
    jobs[`${id_recorrencia}-pre`] = prejob;
  });

  return NextResponse.json({ message: "Agendamento configurado com sucesso" });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id_recorrencia } = body;

  console.log("Cancelando agendamento:", id_recorrencia);

  // Verifica se o ID da recorrência foi informado
  if (!id_recorrencia) {
    return NextResponse.json(
      { message: "ID da recorrência é obrigatório" },
      { status: 400 }
    );
  }

  // Identifica e para os jobs principais e antecipados associados ao ID
  const mainJob = jobs[`${id_recorrencia}-main`];
  const preJob = jobs[`${id_recorrencia}-pre`];

  if (mainJob) {
    mainJob.stop();
    delete jobs[`${id_recorrencia}-main`];
  }

  if (preJob) {
    preJob.stop();
    delete jobs[`${id_recorrencia}-pre`];
  }

  return NextResponse.json({ message: "Agendamento cancelado com sucesso" });
}
