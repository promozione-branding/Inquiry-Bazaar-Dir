import IndustryPage from "./IndustryPage";

export async function generateMetadata({ params }) {
    const { slug } = await params; // ✅ no await

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_Backend_URL}/api/industries/${slug}`,
            { cache: "no-store" }
        );

        const industry = await res.json();
        // console.log(industry);
        if (!industry) {
            return {
                title: "Inquiry Bazaar",
                description: "Inquiry Bazaar",
            };
        }

        return {
            title: industry.data.metaTitle || industry.name,
            description:
                industry.data.metaDescription ||
                industry.data.description?.replace(/<[^>]+>/g, "").slice(0, 150),
        };

    } catch (err) {
        return {
            title: "Inquiry Bazaar",
            description: "Inquiry Bazaar",
        };
    }
}

export default async function Page() {
    return <IndustryPage />;
}