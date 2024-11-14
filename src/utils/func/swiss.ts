class UtilsFuncSwiss {
  async getData(data_hora: string): Promise<string> {
    //recebe data no formato "2024-10-04 08:05:00" e transforma em "04/10/2024 08:05"
    const data = new Date(data_hora);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    // HOra - 3 horas para ajustar ao horário de Brasília
    const hora = data.getHours();
    const minutos = data.getMinutes();

    return `${dia < 10 ? "0" + dia : dia}/${
      mes < 10 ? "0" + mes : mes
    }/${ano} ${hora < 10 ? "0" + hora : hora}:${
      minutos < 10 ? "0" + minutos : minutos
    }`;
  }

  async getSemana(data_semana: string[]): Promise<string> {
    const semana = [
      { value: "1", label: "Segunda-feira" },
      { value: "2", label: "Terça-feira" },
      { value: "3", label: "Quarta-feira" },
      { value: "4", label: "Quinta-feira" },
      { value: "5", label: "Sexta-feira" },
      { value: "6", label: "Sábado" },
      { value: "0", label: "Domingo" },
    ];

    let semanaString = "";
    if (Array.isArray(data_semana) && data_semana.length > 0) {
      for (let i = 0; i < data_semana.length; i++) {
        semanaString += semana.find(
          (dia) => dia.value === data_semana[i]
        )?.label;
        semanaString += ", ";
      }

      return semanaString.slice(0, -2);
    }
    return "Sem dias de entrega definidos";
  }

  async formatMessage(
    id_pedido: number,
    mensagem: string
  ): Promise<{ msg: string; email: string }> {
    // Add a final return statement
    console.log("id_pedido", id_pedido, mensagem);

    const response = await fetch(
      process.env.AUTH0_BASE_URL + `/api/pedido?id=${id_pedido.toString()}`
    );

    if (!response.ok) {
      return { msg: "Erro ao buscar pedido", email: "" };
    }

    const pedidoArray = await response.json();
    const pedido = pedidoArray[0];

    console.log("pedido", pedido);

    const emailResponse = await fetch(
      process.env.AUTH0_BASE_URL + `/api/pessoa?id=${pedido.fk_id_cliente}`
    );

    if (!emailResponse.ok) {
      return { msg: "Erro ao buscar e-mail", email: "" };
    }

    const { email } = await emailResponse.json();

    console.log("email", email);

    const itensCatalogoHtml = Array.isArray(pedido.itens_catalogo)
      ? pedido.itens_catalogo
          .map(
            (
              item: { nome: string; tipo: string; tamanho: string },
              index: number
            ) => `
      <div key="${index}" style="border: 1px solid #D1D5DB; border-radius: 8px; padding: 12px; color: #1F2937;">
        <div style="border: 1px solid #D1D5DB; border-radius: 8px; padding: 12px;">
          <h4 style="font-weight: 600; color: #6B4F3C;">${item.nome}</h4>
          <p><strong>Tipo:</strong> ${item.tipo}</p>
          <p><strong>Tamanho:</strong> ${item.tamanho}</p>
        </div>
      </div>
    `
          )
          .join("")
      : ""; // Retorna uma string vazia se itens_catalogo for indefinido

    const itensPersonalizadosHtml = `
        <div style="background-color: white; padding: 16px; margin-bottom: 16px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #6B4F3C;">
              Pedido #${pedido.id_pedido}
            </h2>
            <span style="color: #6B7280;">
              <strong>Valor Total:</strong> R$${pedido.valor_pedido}
            </span>
          </div>
          <div style="color: #4B5563; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <p>
                <strong>Endereço de Entrega:</strong> ${pedido.endereco_entrega}
              </p>
              <span style="color: #6B7280;">
                <strong>Data Pedido:</strong> ${await this.getData(
                  pedido.data_pedido
                )}
              </span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <p>
                <strong>Dias de Entrega:</strong> ${await this.getSemana(
                  pedido.data_semana
                )}
              </p>
              <p>
                <strong>Data Limite:</strong> ${await this.getData(
                  pedido.data_limite.slice(0, 10)
                )}
              </p>
            </div>
            <p>
              <strong>Horários de Entrega:</strong> ${
                pedido.horario_agendamento
              }
            </p>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 600; margin-top: 8px; margin-bottom: 8px; color: #374151;">
              Itens do Catálogo
            </h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
              ${itensCatalogoHtml}
            </div>
          </div>
        </div>
      `;

    if (mensagem === "agendado") {
      return {
        msg: `
      <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; text-align: center;">
        <h1 style="font-size: 24px; color: #4CAF50; font-weight: bold;">Pedido Agendado</h1>
        <p style="font-size: 16px; color: #333;">Seu pedido foi agendado com sucesso.</p>
      </div>
      <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
        ${itensPersonalizadosHtml}
      </div>`,
        email: email,
      };
    }
    if (mensagem === "preparando") {
      return {
        msg: `
          <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="font-size: 24px; color: #FF9800; font-weight: bold;">Pedido Preparando</h1>
            <p style="font-size: 16px; color: #333;">Estamos preparando seu pedido.</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
            ${itensPersonalizadosHtml}
          </div>`,
        email: email,
      };
    }

    if (mensagem === "caminho") {
      return {
        msg: `
          <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="font-size: 24px; color: #2196F3; font-weight: bold;">Pedido a Caminho</h1>
            <p style="font-size: 16px; color: #333;">Seu pedido está a caminho!</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
            ${itensPersonalizadosHtml}
          </div>`,
        email: email,
      };
    }

    return { msg: "Deu erro na mensagem", email: "" };
  }
}

export default UtilsFuncSwiss;
