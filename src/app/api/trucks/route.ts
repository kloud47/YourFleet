import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json(); 

    const truck = await db.truck.create({
      data: {
        truckId: body.truckId,
        driver: body.driver,
        speed: body.speed,
        route: body.route,
        capacity: body.capacity,
        latitude: body.latitude,
        longitude: body.longitude,
      },
    });

    return NextResponse.json(truck, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating truck", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const trucks = await db.truck.findMany();
    return NextResponse.json(trucks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching trucks", error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const truck = await db.truck.delete({
      where: { truckId: body.truckId },
    });

    return NextResponse.json(truck, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting truck", error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const truck = await db.truck.update({
      where: { truckId: body.truckId },
      data: {
        driver: body.driver,
        speed: body.speed,
        route: body.route,
        capacity: body.capacity,
        latitude: body.latitude,
        longitude: body.longitude,
      },
    });

    return NextResponse.json(truck, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating truck", error }, { status: 500 });
  }
}