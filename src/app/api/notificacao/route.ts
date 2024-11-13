import { NextRequest, NextResponse } from "next/server";
import Crud from "@/utils/postgres/crud";
import { Notificacao } from "@/utils/postgres/types";

const notificacaoCrud = new Crud<Notificacao>("notificacao", "id_notificacao");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const id_pessoa = searchParams.get("fk_id_pessoa");

  if (id) {
    const notificacao = await notificacaoCrud.read(id);
    return NextResponse.json(notificacao);
  } else if (id_pessoa) {
    const notificacao = await notificacaoCrud.readId(id_pessoa, "fk_id_pessoa");
    return NextResponse.json(notificacao);
  } else {
    const notificacaos = await notificacaoCrud.findAll();
    return NextResponse.json(notificacaos);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newNotificacao = await notificacaoCrud.create(body);
    return NextResponse.json(newNotificacao, { status: 201 });
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

  const updatedNotificacao = await notificacaoCrud.update(id, body);
  return NextResponse.json(updatedNotificacao);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedNotificacao = await notificacaoCrud.delete(id);
  return NextResponse.json(deletedNotificacao);
}
