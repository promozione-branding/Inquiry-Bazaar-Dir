import React from 'react'
import Loaction from './Loaction'

export async function generateMetadata({ params }) {
    const { slug, location } = await params;
    const formatLocation = (location) => {
        return decodeURIComponent(location)
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };
    const formattedLocation = formatLocation(location);

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
            title: `${category.citymetaTitle.replace(/New Delhi/gi, formattedLocation) || `${category.name} in ${location}`}`,
            description:
                category.citymetaDescription.replace(/New Delhi/gi, formattedLocation) ||
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
        <Loaction />
    )
}
