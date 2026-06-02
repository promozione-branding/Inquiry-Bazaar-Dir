import React from 'react'
import CategoryPage from './CategoryPage'

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}api/categories/sub/${slug}`, { cache: "no-store" });
        const result = await res.json();
        const category = result?.data?.category;

        if (!category) {
            return {
                title: "Category Not Found",
                description: "No category found",
            };
        }

        return {
            title: category.metaTitle || category.name,
            description:
                category.metaDescription ||
                category.description?.replace(/<[^>]+>/g, "").slice(0, 150),
        };

    } catch (err) {
        return {
            title: "Category - Inquiry Bazaar",
            description: "Category page",
        };
    }
}

export default async function page() {
    return (
        <CategoryPage />
    )
}
