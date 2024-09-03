import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const routes = await db.route.findMany();
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching routes", error },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const route = await db.route.create({
      data: { name: body.name, eta: body.eta, status: body.status },
    });
    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating route", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    const route = await db.route.delete({
      where: { id: body.id },
    });
    return NextResponse.json(route, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting route", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  try {
    const route = await db.route.update({
      where: { id: body.id },
      data: { name: body.name, eta: body.eta, status: body.status },
    });
    return NextResponse.json(route, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating route", error },
      { status: 500 }
    );
  }
}
