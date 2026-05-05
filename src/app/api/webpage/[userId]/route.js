import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    try {
        const db = await connectDB();
        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { message: "UserId or slug required" },
                { status: 400 }
            );
        }

        let query;
        const isObjectId = ObjectId.isValid(userId) && userId.length === 24;

        if (isObjectId) {
            query = { userId: new ObjectId(userId) };
        } else {
            query = { slug: userId };
        }

        const data = await db.collection("webpages").findOne(query);

        if (!data) {
            return NextResponse.json({}, { status: 200 });
        }

        // ✅ if slug → also fetch supplier + business
        if (!isObjectId) {
            const supplier = await db
                .collection("users")
                .findOne(
                    { _id: data.userId },
                    { projection: { password: 0 } }
                );

            const business = supplier
                ? await db
                    .collection("businesses")
                    .findOne({ userId: supplier._id })
                : null;

            return NextResponse.json({
                ...data,
                supplier: supplier
                    ? { ...supplier, business: business || null }
                    : null,
            });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}