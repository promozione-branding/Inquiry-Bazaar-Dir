import React from 'react'
import ProductPage from './ProductPage'

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}api/product/${slug}`, { cache: "no-store" });
        const result = await res.json();
        const prod = result?.data;

        if (!prod) {
            return {
                title: "Product Not Found",
                description: "No product found",
            };
        }

        return {
            title: prod.metaTitle || prod.name,
            description:
                prod.metaDescription ||
                prod.description?.replace(/<[^>]+>/g, "").slice(0, 150),
        };

    } catch (err) {
        return {
            title: "Product - Inquiry Bazaar",
            description: "Product page",
        };
    }
}

export default async function page() {
    return (
        <ProductPage />
    )
}
