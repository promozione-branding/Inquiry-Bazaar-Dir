import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function GET() {
  try {
    const db = await connectDB();

    // get data directly from collections
    const industries = await db
      .collection("industries")
      .find({})
      .toArray();

    const categories = await db
      .collection("categories")
      .find({})
      .toArray();

    // 🧠 build nested structure
    const result = industries.map((industry) => {
      const mainCats = categories.filter(
        (c) =>
          c.industryId?.toString() === industry._id.toString() &&
          !c.parentCategoryId
      );

      const mainCategory = mainCats.map((main) => {
        const subs = categories.filter(
          (c) =>
            c.parentCategoryId &&
            c.parentCategoryId.toString() === main._id.toString()
        );

        return {
          ...main,
          subCategory: subs,
        };
      });

      return {
        ...industry,
        mainCategory,
      };
    });

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}