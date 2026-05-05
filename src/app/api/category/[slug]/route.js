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

    // 🔥 find category by slug
    const category = await db
      .collection("categories")
      .findOne({ slug });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const categoryId = category._id;

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

      // suppliers
      const supplierIds = [
        ...new Set(products.map((p) => p.supplierId).filter(Boolean)),
      ];

      const suppliers = await db
        .collection("users")
        .find({ _id: { $in: supplierIds } })
        .toArray();

      const productsWithSupplier = products.map((p) => ({
        ...p,
        supplier: suppliers.find(
          (s) => s._id.toString() === p.supplierId?.toString()
        ),
      }));

      // media
      const productIds = products.map((p) => p._id);

      const media = await db
        .collection("productmedias") // ✅ fixed
        .find({ productId: { $in: productIds } })
        .toArray();

      const productsWithMedia = productsWithSupplier.map((product) => ({
        ...product,
        media: media.filter(
          (m) => m.productId.toString() === product._id.toString()
        ),
      }));

      const subcategoriesWithProducts = subcategories.map((sub) => ({
        ...sub,
        products: productsWithMedia.filter(
          (p) => p.subCategoryId?.toString() === sub._id.toString()
        ),
      }));

      return NextResponse.json({
        data: {
          category,
          subcategories: subcategoriesWithProducts,
        },
      });
    }

    // 👉 CASE 2: SUBCATEGORY
    else {

      const products = await db
        .collection("products")
        .find({ subCategoryId: categoryId })
        .sort({ createdAt: -1 })
        .toArray();

      const supplierIds = [
        ...new Set(products.map((p) => p.supplierId).filter(Boolean)),
      ];

      const suppliers = await db
        .collection("users")
        .find({ _id: { $in: supplierIds } })
        .toArray();

      const productsWithSupplier = products.map((p) => ({
        ...p,
        supplier: suppliers.find(
          (s) => s._id.toString() === p.supplierId?.toString()
        ),
      }));

      const productIds = products.map((p) => p._id);

      const media = await db
        .collection("productmedias") // ✅ fixed
        .find({ productId: { $in: productIds } })
        .toArray();

      const productsWithMedia = productsWithSupplier.map((product) => ({
        ...product,
        media: media.filter(
          (m) => m.productId.toString() === product._id.toString()
        ),
      }));

      return NextResponse.json({
        data: {
          category,
          products: productsWithMedia,
        },
      });
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}