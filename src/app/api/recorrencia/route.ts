import { NextRequest, NextResponse } from "next/server";
import Crud from "@/utils/postgres/crud";
import { Recorrencia } from "@/utils/postgres/types";

const recorrenciaCrud = new Crud<Recorrencia>("recorrencia", "id_recorrencia");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const id_pedido = searchParams.get("fk_id_pedido");

  if (id) {
    const recorrencia = await recorrenciaCrud.read(id);
    return NextResponse.json(recorrencia);
  } else if (id_pedido) {
    const recorrencia = await recorrenciaCrud.readId(id_pedido, "fk_id_pedido");
    return NextResponse.json(recorrencia);
  } else {
    const recorrencias = await recorrenciaCrud.findAll();
    return NextResponse.json(recorrencias);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newRecorrencia = await recorrenciaCrud.create(body);
    return NextResponse.json(newRecorrencia, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const updatedRecorrencia = await recorrenciaCrud.update(id, body);
  return NextResponse.json(updatedRecorrencia);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedRecorrencia = await recorrenciaCrud.delete(id);
  return NextResponse.json(deletedRecorrencia);
}
