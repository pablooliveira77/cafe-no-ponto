import { NextRequest, NextResponse } from "next/server";
import Crud from "@/utils/postgres/crud";
import { Pedido, PedidoCatalogo } from "@/utils/postgres/types";

const pedidoCrud = new Crud<Pedido>("pedido", "id_pedido");
const catalogoCrud = new Crud<PedidoCatalogo>("pedido_catalogo", "id");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const id_pessoa = searchParams.get("id_pessoa");

  const findpedido = `SELECT pedido.id_pedido, pedido.data_pedido, pedido.valor_pedido, pedido.endereco_entrega, 
	recorrencia.data_semana, recorrencia.horario_agendamento, recorrencia.data_limite, pedido.fk_id_cliente,
	json_agg(
        json_build_object(
            'id_catalogo', catalogo.id_catalogo,
            'nome', catalogo.nome,
            'descricao', catalogo.descricao,
            'tipo', catalogo.tipo,
            'tamanho', catalogo.tamanho,
            'imagem', catalogo.imagem,
            'preco', catalogo.preco
        )
    ) AS itens_catalogo
FROM pedido
JOIN pedido_catalogo ON pedido.id_pedido = pedido_catalogo.fk_id_pedido
JOIN catalogo ON pedido_catalogo.fk_id_catalogo = catalogo.id_catalogo
JOIN recorrencia on pedido.id_pedido = recorrencia.fk_id_pedido
`;

  if (id) {
    const pedido = await pedidoCrud.findSpecialQuery(
      `${findpedido} WHERE pedido.id_pedido = '${id}'
      GROUP BY 
    pedido.id_pedido, pedido.data_pedido, pedido.valor_pedido, 
    pedido.endereco_entrega, pedido.fk_id_cliente, recorrencia.data_semana, recorrencia.horario_agendamento, recorrencia.data_limite`
    );
    return NextResponse.json(pedido);
  } else if (id_pessoa) {
    const pedido = await pedidoCrud.findSpecialQuery(
      `${findpedido} WHERE pedido.fk_id_cliente = '${id_pessoa}'
      GROUP BY 
    pedido.id_pedido, pedido.data_pedido, pedido.valor_pedido, 
    pedido.endereco_entrega, pedido.fk_id_cliente, recorrencia.data_semana, recorrencia.horario_agendamento, recorrencia.data_limite`
    );

    return NextResponse.json(pedido);
  } else {
    const pedidos = await pedidoCrud.findSpecialQuery(
      `${findpedido}
      GROUP BY 
    pedido.id_pedido, pedido.data_pedido, pedido.valor_pedido, 
    pedido.endereco_entrega, pedido.fk_id_cliente, recorrencia.data_semana, recorrencia.horario_agendamento, recorrencia.data_limite`
    );
    return NextResponse.json(pedidos);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tipo, ...body } = await req.json();

    if (tipo === "pedido_catalogo") {
      console.log("Criando pedido catalogo");
      // Criando object pedido catalogo
      body.itens.map(async (item: { id_catalogo: number }) => {
        await catalogoCrud.create({
          fk_id_pedido: body.fk_id_pedido,
          fk_id_catalogo: item.id_catalogo,
        });
      });
    }
    if (tipo === "pedido") {
      console.log("Criando pedido");
      await pedidoCrud.create(body);
    }

    return NextResponse.json(
      { message: "Pedido e catálogo criados com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
