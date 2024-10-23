import { pedido, cafe, cliente } from "@/app/content";

export default function ListPedido(): JSX.Element {
  return (
    <ul role="list" className="divide-y divide-black">
      {pedido.map((item) => (
        <li key={item.id_pedido} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              {cafe.map((i) => {
                if (i.id_cafe === item.fk_id_cafe) {
                  return (
                    <div key={i.id_cafe} className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {i.nome}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Tipo: {i.tipo} - Tamanho: {i.tamanho}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Status do Pedido: {item.status_pedido}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              R${item.valor_pedido},00
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              <time dateTime={item.horario_agendamento}>
                {new Date(item.horario_agendamento).toLocaleString()}
              </time>
            </p>
            {cliente.map((i) => {
              if (i.id_cliente === item.fk_id_cliente) {
                return (
                  <div key={i.id_cliente} className="flex flex-col items-end">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {i.nome}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Entrega: {i.endereco_entrega}
                    </p>
                  </div>
                );
              }
            })}
            {/* {item.is_assinatura && (
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                Assinatura: {assinatura.map((i) => {
                  if (i.id_assinatura === item.fk_id_assinatura) {
                    return (
                      <div>
                        <p>
                          Data de inicio: {i.data_inicio}
                        </p>
                        <p>
                          Periodo: {i.periodicidade}
                        </p>
                      </div>
                    );
                  }
                })}
              </p>
            )} */}
          </div>
        </li>
      ))}
    </ul>
  );
}
