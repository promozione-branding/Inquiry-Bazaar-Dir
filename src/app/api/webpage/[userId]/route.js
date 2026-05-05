import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { ObjectId } from "mongodb"; // ✅ import ObjectId

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
            .collection("webpages")
            .findOne({ userId: new ObjectId(userId) }); // ✅ convert to ObjectId

        console.log(userId, data);

        return NextResponse.json(data || {});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}