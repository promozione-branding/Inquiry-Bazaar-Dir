import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";

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

    const category = await db.collection("categories").findOne({ slug });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const categoryId = category._id;

    // ✅ reusable helper to enrich products with supplier+business+media
    const enrichProducts = async (products) => {
      const supplierIds = [
        ...new Set(products.map((p) => p.supplierId).filter(Boolean)),
      ];

      const suppliers = await db
        .collection("users")
        .find({ _id: { $in: supplierIds } }, { projection: { password: 0 } })
        .toArray();

      // ✅ fetch businesses for all suppliers
      const businesses = await db
        .collection("businesses")
        .find({ userId: { $in: supplierIds } })
        .toArray();

      const productIds = products.map((p) => p._id);

      const media = await db
        .collection("productmedias")
        .find({ productId: { $in: productIds } })
        .toArray();

      return products.map((product) => {
        const supplier = suppliers.find(
          (s) => s._id.toString() === product.supplierId?.toString()
        );

        const business = supplier
          ? businesses.find(
            (b) => b.userId.toString() === supplier._id.toString()
          )
          : null;

        return {
          ...product,
          supplier: supplier
            ? { ...supplier, business: business || null }
            : null,
          media: media.filter(
            (m) => m.productId.toString() === product._id.toString()
          ),
        };
      });
    };

    // 👉 CASE 1: MAIN CATEGORY
    if (!category.parentCategoryId) {
      const subcategories = await db
        .collection("categories")
        .find({ parentCategoryId: categoryId })
        .toArray();

      const subIds = subcategories.map((sub) => sub._id);

      const products = await db
        .collection("products")
        .find({ subCategoryId: { $in: subIds } })
        .sort({ createdAt: -1 })
        .toArray();

      const enrichedProducts = await enrichProducts(products);

      const subcategoriesWithProducts = subcategories.map((sub) => ({
        ...sub,
        products: enrichedProducts.filter(
          (p) => p.subCategoryId?.toString() === sub._id.toString()
        ),
      }));

      return NextResponse.json({
        data: { category, subcategories: subcategoriesWithProducts },
      });
    }

    // 👉 CASE 2: SUBCATEGORY
    else {
      const products = await db
        .collection("products")
        .find({ subCategoryId: categoryId })
        .sort({ createdAt: -1 })
        .toArray();

      const enrichedProducts = await enrichProducts(products);

      return NextResponse.json({
        data: { category, products: enrichedProducts },
      });
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}