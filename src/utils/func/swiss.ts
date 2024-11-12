class UtilsFuncSwiss {
  async getData(data_hora: string): Promise<string> {
    console.log("data_hora", data_hora);

    //recebe data no formato "2024-10-04T08:05:00" e transforma em "04/10/2024 08:05"
    const data = new Date(data_hora);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
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
    for (let i = 0; i < data_semana.length; i++) {
      semanaString += semana.find((dia) => dia.value === data_semana[i])?.label;
      semanaString += ", ";
    }

    return semanaString.slice(0, -2);
  }

  async postMessage(id_pedido: number, mensagem: string): Promise<string> {
    console.log("id_pedido", id_pedido, mensagem);

    return "Mensagem enviada com sucesso!";
  }
}

export default UtilsFuncSwiss;
