// app/api/product/supplier/[id]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const db = await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 400 }
      );
    }

    const supplierId = new ObjectId(id);

    // 🔥 GET ALL PRODUCTS BY SUPPLIER
    const products = await db
      .collection("products")
      .find({ supplierId })
      .sort({ createdAt: -1 })
      .toArray();

    if (!products.length) {
      return NextResponse.json({ success: true, data: [] });
    }

    // 🔥 GET MEDIA FOR ALL PRODUCTS
    const productIds = products.map((p) => p._id);

    const media = await db
      .collection("productmedias")
      .find({ productId: { $in: productIds } })
      .toArray();

    // 🔥 GET CATEGORY + SUBCATEGORY IDS
    // const categoryIds = [...new Set(products.map((p) => p.categoryId).filter(Boolean))];
    // const subCategoryIds = [...new Set(products.map((p) => p.subCategoryId).filter(Boolean))];

    // const allCategoryIds = [...categoryIds, ...subCategoryIds];

    // const categories = await db
    //   .collection("categories")
    //   .find({ _id: { $in: allCategoryIds } })
    //   .toArray();

    // 🔥 ENRICH PRODUCTS
    const enrichedProducts = products.map((product) => {
      //   const category = categories.find(
      //     (c) => c._id.toString() === product.categoryId?.toString()
      //   );
      //   const subCategory = categories.find(
      //     (c) => c._id.toString() === product.subCategoryId?.toString()
      //   );
      const productMedia = media.filter(
        (m) => m.productId.toString() === product._id.toString()
      );
      const primaryImage =
        productMedia.find((m) => m.isPrimary) || productMedia[0] || null;

      return {
        ...product,
        // category: category || null,
        // subCategory: subCategory || null,
        media: productMedia,
        primaryImage,
      };
    });

    return NextResponse.json({ success: true, data: enrichedProducts });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}