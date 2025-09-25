import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const menuItems = await db.menuItem.findMany({
      where: { available: true },
      orderBy: { category: "asc" },
    });

    // Convert Decimal to number for JSON serialization
    const serializedItems = menuItems.map((item) => ({
      ...item,
      price: Number(item.price),
    }));

    return NextResponse.json(serializedItems);
  } catch (error) {
    console.error("Menu API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}
