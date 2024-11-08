import { cliente } from "@/app/content";

interface Pedido {
  id_pedido: number;
  data_pedido: string;
  valor_pedido: number;
  fk_id_cliente: string;
}


// id_pedido: 1,
// data_pedido: "2024-10-04T08:00:00",
// valor_pedido: 12,
// data_semana: ['1', '3', '5'],
// isActive: true,
// horario_agendamento: ['07:00', '11:00'],
// fk_id_barman: "auth0|672a206b620fc2be082a8c27",
// fk_id_entregador: 2,
// fk_id_cliente: "auth0|6728d160d39ec3ae38e85ec2",
// fk_id_catalogo: [1],

interface ListPedidoProps {
  pedido: Pedido;
}

const ListPedido: React.FC<ListPedidoProps> = ({ pedido }) => {
  return (
    <li className="flex justify-between gap-x-6 py-5 ">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          {/* {catalogo.map((i) => {
            if (Array.isArray(pedido.fk_id_catalogo) && pedido.fk_id_catalogo.includes(i.id_catalogo)) {
              return (
                <div key={i.id_catalogo} className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-coffe">
                    {i.nome}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5">
                    Tipo: {i.tipo} - Tamanho: {i.tamanho}
                  </p>
                </div>
              );
            }
          })} */}
        </div>
      </div>
      <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-coffe">
          R${pedido.valor_pedido},00
        </p>
        <p className="mt-1 text-xs leading-5 ">
          <time dateTime={pedido.data_pedido}>
            {new Date(pedido.data_pedido).toLocaleString()}
          </time>
        </p>
        {cliente.map((i) => {
          if (i.id_cliente === pedido.fk_id_cliente) {
            return (
              <div key={i.id_cliente} className="flex flex-col items-end">
                {/* <p className="mt-1 truncate text-xs leading-5 ">
                  Entrega: {i.endereco_entrega}
                </p> */}
              </div>
            );
          }
        })}
      </div>
    </li>
  );
}

export default ListPedido;