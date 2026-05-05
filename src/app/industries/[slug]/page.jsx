import IndustryPage from "./IndustryPage";

export async function generateMetadata({ params }) {
    const { slug } = await params; // ✅ no await

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/industry/${slug}`,
            { cache: "no-store" }
        );

        const industry = await res.json();

        if (!industry) {
            return {
                title: "Promote Bharat",
                description: "Promote Bharat",
            };
        }

        return {
            title: industry.metaTitle || industry.name,
            description:
                industry.metaDescription ||
                industry.description?.replace(/<[^>]+>/g, "").slice(0, 150),
        };

    } catch (err) {
        return {
            title: "Promote Bharat",
            description: "Promote Bharat",
        };
    }
}

export default async function Page() {
    return <IndustryPage />;
}