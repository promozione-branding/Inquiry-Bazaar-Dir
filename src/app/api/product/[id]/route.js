import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function GET(req, { params }) {
  try {
    const db = await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const product = await db.collection("products").findOne({ slug: id });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const category = await db.collection("categories").findOne({ _id: product.categoryId });

    const subCategory = await db.collection("categories").findOne({ _id: product.subCategoryId });

    const supplier = await db.collection("users")
      .findOne(
        { _id: product.supplierId },
        { projection: { password: 0 } }
      );

    const business = supplier
      ? await db.collection("businesses").findOne({ userId: supplier._id, }) : null;

    const media = await db.collection("productmedias").find({ productId: product._id }).toArray();

    const primaryImage = media.find((m) => m.isPrimary) || media[0] || null;

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        categoryId: category || null,
        subCategoryId: subCategory || null,
        supplierId: {
          ...supplier,
          business: business || null,
        },
        media,
        primaryImage,
      },
    });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}