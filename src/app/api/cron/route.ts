// src/app/api/cron/route.ts
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
    id_pedido,
    // valor_pedido,
    data_semana,
    horario_agendamento,
    // isActive,
    // fk_id_barman,
    // fk_id_entregador,
    fk_id_cliente,
    // fk_id_cafe,
  } = body;

  // Itera por cada horário e cria o job com a expressão cron
  horario_agendamento.forEach((horario: string) => {
    const [hour, minute] = horario.split(":");
    const cronExpression = `${minute} ${hour} * * ${data_semana.join(",")}`;

    // Cadastra o job para o agendamento específico
    const job = cron.schedule(cronExpression, () => {
      console.log(
        `Executando tarefa para assinatura ${id_pedido} do cliente ${fk_id_cliente} às ${hour}:${minute}`
      );
    });

    // Armazena o job para controle
    jobs[id_pedido] = job;
  });

  return NextResponse.json({ message: "Agendamento configurado com sucesso" });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id_assinatura } = body;

  console.log("Cancelando agendamento:", id_assinatura);

  if (jobs[id_assinatura]) {
    jobs[id_assinatura].stop();
    delete jobs[id_assinatura];
    return NextResponse.json({ message: "Agendamento cancelado com sucesso" });
  } else {
    return NextResponse.json(
      { message: "Agendamento não encontrado" },
      { status: 404 }
    );
  }
}
