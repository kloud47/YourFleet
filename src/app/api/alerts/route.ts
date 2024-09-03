import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const alerts = await db.alert.findMany();
    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching alerts", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const alert = await db.alert.create({
      data: { type: body.type, message: body.message },
    });
    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating alert", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    const alert = await db.alert.delete({
      where: { id: body.id },
    });
    return NextResponse.json(alert, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting alert", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  try {
    const alert = await db.alert.update({
      where: { id: body.id },
      data: { type: body.type, message: body.message },
    });
    return NextResponse.json(alert, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating alert", error },
      { status: 500 }
    );
  }
}
