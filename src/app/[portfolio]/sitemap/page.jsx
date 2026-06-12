import React from 'react'
import Sitemap from './Sitemap'

export async function generateMetadata({ params }) {
    const { portfolio } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`, { cache: "no-store" });
        const result = await res.json();
        // console.log("Metadata Result:", result);
        if (!result || Object.keys(result).length === 0) {
            return {
                title: "Webpage - Inquiry Bazaar",
                description: "Webpage - Inquiry Bazaar",
            };
        }

        return {
            title: `Sitemap - ${result?.data?.user?.business?.companyName}`,
            description: `${result?.data?.user?.business?.companyName}`,
        };

    } catch {
        return {
            title: "Webpage - Inquiry Bazaar",
            description: "Webpage - Inquiry Bazaar",
        };
    }
}

export default function page() {
    return (
        <Sitemap />
    )
}