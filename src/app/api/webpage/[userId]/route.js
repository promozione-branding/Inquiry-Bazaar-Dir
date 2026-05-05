import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function GET(req, { params }) {
    try {
        const db = await connectDB();
        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { message: "UserId required" },
                { status: 400 }
            );
        }

        const data = await db
            .collection("webpages") // collection name
            .findOne({ userId });

        return NextResponse.json(data || {});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}