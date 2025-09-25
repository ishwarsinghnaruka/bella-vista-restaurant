import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const reservation = await db.reservation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: body.date,
        time: body.time,
        guests: parseInt(body.guests),
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
