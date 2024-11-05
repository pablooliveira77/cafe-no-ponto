import { cafe, cliente } from "@/app/content";

interface Pedido {
  id_pedido: number;
  data_pedido: string;
  horario_agendamento: string;
  status_pedido: string;
  valor_pedido: number;
  is_assinatura: boolean;
  // fk_id_barman: string;
  // fk_id_entregador: number;
  fk_id_cliente: string;
  fk_id_cafe: number;
  fk_id_assinatura: number | null;
  created_at: string;
}

interface ListPedidoProps {
  pedido: Pedido;
}

const ListPedido: React.FC<ListPedidoProps> = ({ pedido }) => {
  return (
    <li className="flex justify-between gap-x-6 py-5 ">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          {cafe.map((i) => {
            if (i.id_cafe === pedido.fk_id_cafe) {
              return (
                <div key={i.id_cafe} className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-coffe">
                    {i.nome}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5">
                    Tipo: {i.tipo} - Tamanho: {i.tamanho}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5">
                    Status do Pedido: {pedido.status_pedido}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-coffe">
          R${pedido.valor_pedido},00
        </p>
        <p className="mt-1 text-xs leading-5 ">
          <time dateTime={pedido.horario_agendamento}>
            {new Date(pedido.horario_agendamento).toLocaleString()}
          </time>
        </p>
        {cliente.map((i) => {
          if (i.id_cliente === pedido.fk_id_cliente) {
            return (
              <div key={i.id_cliente} className="flex flex-col items-end">
                <p className="mt-1 truncate text-xs leading-5 ">
                  Entrega: {i.endereco_entrega}
                </p>
              </div>
            );
          }
        })}
      </div>
    </li>
  );
}

export default ListPedido;