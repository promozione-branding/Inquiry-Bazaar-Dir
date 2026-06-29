import React from 'react'
import SearchPage from './SearchPage'

export async function generateMetadata({ params, }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}api/search/${slug}`,
            { cache: "no-store", }
        );
        const result = await res.json();
        const meta = result?.data;
        console.log(result?.data)
        if (!meta) {
            return {
                title: "Inquiry Bazaar",
                description: "Browse products",
            };
        }

        return {
            title: meta.metaTitle,
            description: meta.metaDescription,
            openGraph: {
                title: meta.title,
                description: meta.description
            },
        };

    } catch {
        return {
            title: "Inquiry Bazaar",
            description: "Browse products",
        };
    }
}

export default function page() {
    return (
        <SearchPage />
    )
}
