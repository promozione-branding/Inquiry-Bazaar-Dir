import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type"); // main | sub
    const parentId = searchParams.get("parentId");

    let filter = {};

    // ✅ Main Categories
    if (type === "main") {
      filter.parentCategoryId = null;
    }

    // ✅ Sub Categories (all)
    if (type === "sub" && !parentId) {
      filter.parentCategoryId = { $ne: null };
    }

    // ✅ Sub Categories by Parent
    if (parentId) {
      filter.parentCategoryId = parentId;
    }

    const categories = await db
      .collection("categories")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ data: categories });

  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}