import React from 'react'
import SearchPage from './SearchPage'

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}api/search/${slug}`, { cache: "no-store" });
        const result = await res.json();
        const category = result?.data?.category || result?.data?.industry;
        // console.log(result?.data)
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

export default function page() {
    return (
        <SearchPage />
    )
}
