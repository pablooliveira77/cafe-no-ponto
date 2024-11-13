import { NextRequest, NextResponse } from "next/server";
import Crud from "@/utils/postgres/crud";
import { Pessoa } from "@/utils/postgres/types";

const pessoaCrud = new Crud<Pessoa>("pessoa", "id_pessoa");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  if (id) {
    const pessoa = await pessoaCrud.read(id);
    return NextResponse.json(pessoa);
  } else if (email) {
    const pessoa = await pessoaCrud.readEmail(email);
    return NextResponse.json(pessoa);
  } else {
    const pessoas = await pessoaCrud.findAll();
    return NextResponse.json(pessoas);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPessoa = await pessoaCrud.create(body);
    return NextResponse.json(newPessoa, { status: 201 });
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

  const updatedPessoa = await pessoaCrud.update(id, body);
  return NextResponse.json(updatedPessoa);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedPessoa = await pessoaCrud.delete(id);
  return NextResponse.json(deletedPessoa);
}
