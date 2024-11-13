import React, { useState } from "react";

interface recorrencia {
  id_recorrencia: number;
  data_semana: string[];
  horario_agendamento: string[];
  data_limite: string;
  fk_id_pedido: number;
}

const semana = [
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
  { value: "0", label: "Domingo" },
];

interface CarrinhoItem {
  id_catalogo: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface FormPedidoProps {
  carrinho: CarrinhoItem[];
  user_id: string;
}

export default function FormPedido({ carrinho, user_id }: FormPedidoProps) {
  const [recorrencia, setRecorrencia] = useState<recorrencia>({
    id_recorrencia: 0,
    data_semana: [],
    horario_agendamento: ["07:00"],
    data_limite: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    fk_id_pedido: 0,
  });
  const [endereco, setEndereco] = useState("");
  const [btn, setBtn] = useState(false);
  const [btnText, setBtnText] = useState("Realizar pedido");

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const day = event.target.value;
    setRecorrencia((prev) => ({
      ...prev,
      data_semana: prev.data_semana.includes(day)
        ? prev.data_semana.filter((d) => d !== day)
        : [...prev.data_semana, day],
    }));
  };

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTime = event.target.value;

    setRecorrencia((prev) => {
      const updatedTimes = [...prev.horario_agendamento];
      updatedTimes[index] = newTime;
      return { ...prev, horario_agendamento: updatedTimes };
    });
  };

  const addNewTime = () => {
    setRecorrencia((prev) => ({
      ...prev,
      horario_agendamento: [...prev.horario_agendamento, ""],
    }));
  };

  const removeTime = (index: number) => {
    setRecorrencia((prev) => ({
      ...prev,
      horario_agendamento: prev.horario_agendamento.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleDataLimite = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setRecorrencia((prev) => ({
      ...prev,
      data_limite: data,
    }));
  };

  const handleValor = (cart_total: CarrinhoItem[]): number => {
    const cart_pedido = cart_total.reduce(
      (acc, item) =>
        acc +
        item.preco *
          item.quantidade *
          recorrencia.data_semana.length *
          recorrencia.horario_agendamento.length,
      0
    );

    return cart_pedido;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updateButtonState(true, "Enviando...");

    const id_pedido = Math.floor(Math.random() * 1000);
    const id_recorrencia = Math.floor(Math.random() * 1000);

    atualizarDadosRecorrencia(id_pedido, id_recorrencia);

    const pedido = criarPedido(id_pedido);
    const pedido_catalogo = criarPedidoCatalogo(id_pedido);

    console.log("Seu Pedido:", pedido);
    console.log("Seu Pedido Catalogo:", pedido_catalogo);
    console.log("Sua Recorrencia:", recorrencia);

    if (!validarDados()) {
      updateButtonState(false, "Realizar pedido");
      return;
    }

    // Executa as requisições em sequência, uma após a outra
    const pedidoResponse = await salvarDados("/api/pedido", pedido);
    if (!pedidoResponse.ok) {
      alert("Erro ao fazer o pedido");
      updateButtonState(false, "Realizar pedido");
      return;
    }

    const catalogoResponse = await salvarDados("/api/pedido", pedido_catalogo);
    if (!catalogoResponse.ok) {
      alert("Erro ao fazer o pedido no catálogo");
      updateButtonState(false, "Realizar pedido");
      return;
    }

    const recorrenciaResponse = await salvarDados(
      "/api/recorrencia",
      recorrencia
    );
    if (!recorrenciaResponse.ok) {
      alert("Erro ao salvar a recorrência");
      updateButtonState(false, "Realizar pedido");
      return;
    }

    if (!pedidoResponse.ok || !catalogoResponse.ok || !recorrenciaResponse.ok) {
      alert("Erro ao fazer o pedido");
      updateButtonState(false, "Realizar pedido");
      return;
    }

    const cronResponse = await salvarDados("/api/cron", recorrencia);

    if (cronResponse.ok) {
      await resetarForm();
    } else {
      alert("Erro ao configurar agendamento");
    }

    updateButtonState(false, "Realizar pedido");
  };

  const updateButtonState = (isDisabled: boolean, text: string) => {
    setBtn(isDisabled);
    setBtnText(text);
  };

  const atualizarDadosRecorrencia = (
    id_pedido: number,
    id_recorrencia: number
  ) => {
    recorrencia.fk_id_pedido = id_pedido;
    recorrencia.id_recorrencia = id_recorrencia;
  };

  const criarPedido = (id_pedido: number) => ({
    tipo: "pedido",
    id_pedido,
    data_pedido: new Date().toISOString(),
    endereco_entrega: endereco,
    valor_pedido: handleValor(carrinho),
    fk_id_cliente: user_id,
  });

  const criarPedidoCatalogo = (id_pedido: number) => ({
    tipo: "pedido_catalogo",
    fk_id_pedido: id_pedido,
    itens: carrinho.flatMap((item) =>
      Array(item.quantidade).fill({ id_catalogo: item.id_catalogo })
    ),
  });

  const validarDados = () => {
    if (recorrencia.data_semana.length === 0) {
      alert("Selecione pelo menos um dia da semana");
      return false;
    }
    if (recorrencia.horario_agendamento.length === 0) {
      alert("Selecione pelo menos um horário");
      return false;
    }
    if (endereco === "") {
      alert("Informe o endereço de entrega");
      return false;
    }
    return true;
  };

  const salvarDados = async (url: string, data: object) => {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };

  const resetarForm = async () => {
    setRecorrencia({
      id_recorrencia: 0,
      data_semana: [],
      horario_agendamento: ["07:00"],
      data_limite: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split("T")[0],
      fk_id_pedido: 0,
    });
    setEndereco("");

    // Limpar carrinho
    localStorage.removeItem("carrinho");
    
    // atualizar pagina
    await window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="font-semibold">Dias da Semana:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {semana.map((day) => (
              <label
                key={day.value}
                className="flex items-handleTimeChange(e, 0)center space-x-2"
              >
                <input
                  type="checkbox"
                  value={day.value}
                  checked={recorrencia.data_semana.includes(day.value)}
                  onChange={handleDayChange}
                  className="form-checkbox"
                />
                <span>{day.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Horários:</h3>
          {recorrencia.horario_agendamento.map((time, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e, index)}
                className="p-2 block w-full border rounded"
              />
              <button
                type="button"
                onClick={() => removeTime(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewTime}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar Novo Horário
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Endereço de entrega</h3>
          <input
            type="text"
            placeholder="Endereço de entrega"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="p-2 block w-full border rounded"
          />
        </div>

        {/* Selecionar data limite da recorrencia */}
        <div className="mb-4">
          <label className="block font-semibold">Data Limite:</label>
          <input
            type="date"
            value={recorrencia.data_limite}
            onChange={(e) => handleDataLimite(e)}
            className="p-2 block w-full border rounded"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Total do pedido por semana
          </span>
          <span className="text-lg font-semibold text-gray-900">
            R$ {handleValor(carrinho)}
          </span>
        </div>

        <button
          type="submit"
          {...(btn && { disabled: true })}
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            btn && "opacity-50 cursor-wait"
          }`}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
}
