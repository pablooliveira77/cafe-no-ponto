import { NextRequest, NextResponse } from "next/server";

// MODELO DE DADOS
// {
//   "job": {
//     "url": "{{rotajob}}",
//     "enabled": true,
//     "saveResponses": true,
//     "schedule": {
//       "timezone": "America/Sao_Paulo",
//       "expiresAt": 20241119091000,
//       "hours": [10],
//       "mdays": [18],
//       "minutes": [30, 35],
//       "months": [-1],
//       "wdays": [-1]
//     },
//     "extendedData": {
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "body": "{\n   \"id_pedido\": 1,\n   \"tipo\": \"pedido\"\n}"
//     },
//     "requestMethod": 1
//   }
// }

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    id_recorrencia,
    data_semana,
    horario_agendamento,
    data_limite,
    fk_id_pedido,
  } = body;

  // Transforme data_limite em uma data válida "20241119091000"
  const date = new Date(data_limite);
  const dataLimite =
    date.getFullYear() * 10000000000 +
    (date.getMonth() + 1) * 100000000 +
    date.getDate() * 1000000 +
    date.getHours() * 10000 +
    date.getMinutes() * 100 +
    date.getSeconds();
  console.log(dataLimite); // Exibe o timestamp no formato 20241119091000

  await fetch(process.env.AUTH0_BASE_URL + "/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_pedido: fk_id_pedido, tipo: "agendado" }),
  });

  // Itera por cada horário e cria o job com a expressão cron
  for (const horario of horario_agendamento) {
    const [hour, minute] = horario.split(":");
    const dataSemana = data_semana.map((dia: string) => parseInt(dia, 10));
    
    // Calcula o horário 30 minutos antes
    const preMinute = parseInt(minute, 10) - 30;
    const preHour = preMinute < 0 ? parseInt(hour, 10) - 1 : parseInt(hour, 10);
    const adjustedMinute = (preMinute + 60) % 60;
    console.log("Agendamento para", preHour, adjustedMinute);

    const cronExpression = {
      job: {
        title: `${id_recorrencia} - Agendamento - ${hour}:${minute}`,
        url: process.env.AUTH0_BASE_URL + "/api/email",
        enabled: true,
        saveResponses: true,
        schedule: {
          timezone: "America/Sao_Paulo",
          expiresAt: dataLimite,
          hours: [parseInt(hour, 10)],
          mdays: [-1],
          minutes: [parseInt(minute, 10)],
          months: [-1],
          wdays: dataSemana,
        },
        extendedData: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_pedido: fk_id_pedido,
            tipo: "caminho",
          }),
        },
        requestMethod: 1,
      },
    };
    
     const cronExpressionPre = {
      job: {
        title: `${id_recorrencia} - Preparando - ${preHour}:${adjustedMinute}`,
        url: process.env.AUTH0_BASE_URL + "/api/email",
        enabled: true,
        saveResponses: true,
        schedule: {
          timezone: "America/Sao_Paulo",
          expiresAt: dataLimite,
          hours: [preHour],
          mdays: [-1],
          minutes: [adjustedMinute],
          months: [-1],
          wdays: dataSemana,
        },
        extendedData: {
          headers: {
            "Content-Type": "application/json",
          },
          body: `{\n   \"id_pedido\": ${fk_id_pedido},\n   \"tipo\": \"preparando\"\n}`,
        },
        requestMethod: 1,
      },
    };
  
    try {
      const responseJob = await fetch(`${process.env.CRON_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+ process.env.CRON_TOKEN,
        },
        body: JSON.stringify(cronExpression),
      });

      const responseJobPre = await fetch(`${process.env.CRON_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+ process.env.CRON_TOKEN,
        },
        body: JSON.stringify(cronExpressionPre),
      });
  
      if (!responseJob.ok || !responseJobPre.ok) {
        console.error("Erro:", responseJob.statusText);
      } else {
        console.log("Job agendado:", await responseJob.json());
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  
    // Aumenta o intervalo entre as requisições
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return NextResponse.json({ message: "Agendamento configurado com sucesso" });
}
