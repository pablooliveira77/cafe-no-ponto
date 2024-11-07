import React, { useState } from "react";

interface Pedido {
  id_pedido: number;
  data_pedido: string;
  valor_pedido: number;
  data_semana: string[];
  horario_agendamento: string[];
  isActive: boolean;
  fk_id_barman: string;
  fk_id_entregador: string;
  fk_id_cliente: string;
  fk_id_cafe: number[];
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
  id_cafe: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface FormPedidoProps {
  carrinho: CarrinhoItem[];
  user_id: string;
}

export default function FormPedido({ carrinho, user_id }: FormPedidoProps) {
  const [pedido, setPedido] = useState<Pedido>({
    id_pedido: 0,
    data_pedido: "",
    valor_pedido: 0,
    data_semana: [],
    horario_agendamento: ["07:00"],
    isActive: true,
    fk_id_barman: "",
    fk_id_entregador: "",
    fk_id_cliente: user_id,
    fk_id_cafe: [],
  });

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const day = event.target.value;
    setPedido((prev) => ({
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

    setPedido((prev) => {
      const updatedTimes = [...prev.horario_agendamento];
      updatedTimes[index] = newTime;
      return { ...prev, horario_agendamento: updatedTimes };
    });
  };

  const addNewTime = () => {
    setPedido((prev) => ({
      ...prev,
      horario_agendamento: [...prev.horario_agendamento, ""],
    }));
  };

  const removeTime = (index: number) => {
    setPedido((prev) => ({
      ...prev,
      horario_agendamento: prev.horario_agendamento.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleIsActiveChange = () => {
    setPedido((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleValor = (cart_total: CarrinhoItem[]): number => {
    const cart_pedido = cart_total.reduce(
      (acc, item) =>
        acc +
        item.preco *
          item.quantidade *
          pedido.data_semana.length *
          pedido.horario_agendamento.length,
      0
    );

    return cart_pedido;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const id_pedido = Math.floor(Math.random() * 1000);

    //  Atualizar dados do produto
    pedido.id_pedido = id_pedido;
    pedido.fk_id_cliente = user_id;
    pedido.data_pedido = new Date().toISOString();
    pedido.valor_pedido = handleValor(carrinho);
    pedido.fk_id_cafe = carrinho.map((item) => item.id_cafe);

    console.log("Seu Pedido:", pedido);

    if (pedido.data_semana.length === 0) {
      alert("Selecione pelo menos um dia da semana");
      return;
    }

    if (pedido.horario_agendamento.length === 0) {
      alert("Adicione pelo menos um horário");
      return;
    }

    // Enviar requisição para a API
    const response = await fetch("/api/cron", {
      method: "POST",
      body: JSON.stringify(pedido),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("Resposta da API:", data);

    if (response.ok) {
      alert(data.message);

      setPedido({
        id_pedido: 0,
        data_pedido: "",
        valor_pedido: 0,
        data_semana: [],
        horario_agendamento: [],
        isActive: true,
        fk_id_barman: "",
        fk_id_entregador: "",
        fk_id_cliente: "",
        fk_id_cafe: [],
      });
    } else {
      alert("Erro ao configurar agendamento");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="font-semibold">Dias da Semana:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {semana.map((day) => (
              <label key={day.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day.value}
                  checked={pedido.data_semana.includes(day.value)}
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
          {pedido.horario_agendamento.map((time, index) => (
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

        <label className="block mb-4 items-center">
          <input
            type="checkbox"
            checked={pedido.isActive}
            onChange={handleIsActiveChange}
            className="mr-2"
          />
          Ativo
        </label>

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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Realizar pedido
        </button>
      </form>
    </div>
  );
}
