import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const menuItems = await db.menuItem.findMany({
      where: { available: true },
      orderBy: { category: "asc" },
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
