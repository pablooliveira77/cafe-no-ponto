// import UtilsSwiss from '@/utils/func/swiss'

interface Pedido {
  id_pedido: number;
  data_pedido: string;
  valor_pedido: number;
  endereco_entrega: string;
  data_semana: [string];
  horario_agendamento: [string];
  data_limite: string;
  fk_id_cliente: string;
  itens_catalogo: [
    {
      id_catalogo: number;
      nome: string;
      tipo: string;
      tamanho: string;
      imagem: string;
    },
    {
      id_catalogo: number;
      nome: string;
      tipo: string;
      tamanho: string;
      imagem: string;
    }
  ];
}

interface ListPedidoProps {
  pedido: Pedido;
}

const ListPedido: React.FC<ListPedidoProps> = ({ pedido }) => {
  // const { getData } = new UtilsSwiss();

  // const formatarData = async (data: string) => {
  //   const data_formatada = await getData(data)
  //   return data_formatada
  // }
  

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-coffe">
          Pedido #{pedido.id_pedido}
        </h2>
        <span className="text-gray-500">
          <strong>Valor Total:</strong> R${pedido.valor_pedido.toFixed(2)}
        </span>
      </div>
      <div className="text-gray-600 mb-2">
        <div className="flex justify-between items-center mb-2">
          <p>
            <strong>Endereço de Entrega:</strong> {pedido.endereco_entrega}
          </p>
          <span className="text-gray-500"><strong>Data:</strong> {pedido.data_pedido}</span>
        </div>
        <p>
          <strong>Dias de Entrega:</strong> {pedido.data_semana.join(", ")}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-700">
          Itens do Catálogo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pedido.itens_catalogo.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded p-3 text-gray-800"
            >
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-semibold text-coffe">{item.nome}</h4>
                <p>
                  <strong>Tipo:</strong> {item.tipo}
                </p>
                <p>
                  <strong>Tamanho:</strong> {item.tamanho}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPedido;
