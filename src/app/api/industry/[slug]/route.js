import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function GET(req, { params }) {
    try {
        const db = await connectDB();
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                { message: "Slug required" },
                { status: 400 }
            );
        }

        // ✅ find industry
        const industry = await db.collection("industries").findOne({ slug });

        if (!industry) {
            return NextResponse.json(
                { message: "Industry not found" },
                { status: 404 }
            );
        }

        // ✅ get related categories
        const categories = await db.collection("categories").find({ industryId: industry._id }).toArray();

        // 🧠 build nested structure (same logic as before)
        const mainCategory = categories
            .filter((c) => !c.parentCategoryId)
            .map((main) => {
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

        return NextResponse.json({
            ...industry,
            mainCategory,
        });

    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}