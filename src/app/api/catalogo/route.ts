import { NextRequest, NextResponse } from "next/server";
import Crud from "@/utils/postgres/crud";
import { Catalogo } from "@/utils/postgres/types";

const catalogoCrud = new Crud<Catalogo>("catalogo", "id_catalogo");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const catalogo = await catalogoCrud.read(id);
    return NextResponse.json(catalogo);
  } else {
    const catalogos = await catalogoCrud.findAll()
    return NextResponse.json(catalogos);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCatalogo = await catalogoCrud.create(body);
    return NextResponse.json(newCatalogo, { status: 201 });
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

  const updatedCatalogo = await catalogoCrud.update(id, body);
  return NextResponse.json(updatedCatalogo);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedCatalogo = await catalogoCrud.delete(id);
  return NextResponse.json(deletedCatalogo);
}
