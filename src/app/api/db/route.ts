import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    return NextResponse.json({ connected: connection.connection.readyState === 1 });
  } catch (error) {
    console.error("MongoDB connection failed", error);
    return NextResponse.json({ connected: false, error: "Database connection failed" }, { status: 500 });
  }
}
