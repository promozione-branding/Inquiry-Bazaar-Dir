import { redirect } from "next/navigation";
import Portfolio from "./Portfolio";

export async function generateMetadata({ params }) {
    const { portfolio } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/webpage/${portfolio}`,
            { cache: "no-store" }
        );

        const result = await res.json();

        if (!result || Object.keys(result).length === 0) {
            return {
                title: "Webpage - Inquiry Bazaar",
                description: "Webpage - Inquiry Bazaar",
            };
        }

        return {
            title: `${result?.supplier?.business?.companyName} - Inquiry Bazaar`,
            description: `${result?.supplier?.business?.companyName} - Inquiry Bazaar`,
        };

    } catch {
        return {
            title: "Webpage - Inquiry Bazaar",
            description: "Webpage - Inquiry Bazaar",
        };
    }
}

export default async function Page({ params }) {
    const { portfolio } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/webpage/${portfolio}`,
            { cache: "no-store" }
        );

        const data = await res.json();

        // 🚀 REDIRECT BEFORE PAGE LOAD
        if (!data || Object.keys(data).length === 0) {
            redirect("/");
        }

        return <Portfolio initialData={data} />;

    } catch (err) {
        redirect("/");
    }
}