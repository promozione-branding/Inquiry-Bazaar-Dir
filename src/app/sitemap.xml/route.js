import { locations } from "../../../data";

export const dynamic = "force-dynamic";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://dir.inquirybazaar.com";
  const backendUrl = process.env.NEXT_PUBLIC_Backend_URL

  let industries = [];
  let categories = [];
  let subCategories = [];
  let products = [];

  try {
    const resIndustries = await fetch(`${backendUrl}api/industries`, { cache: "no-store", });
    const dataIndustries = await resIndustries.json();
    industries = dataIndustries.data
    const resCategories = await fetch(`${backendUrl}api/categories/main`, { cache: "no-store", });
    const dataCategories = await resCategories.json();
    categories = dataCategories.data
    const resSubCategories = await fetch(`${backendUrl}api/categories`, { cache: "no-store", });
    const dataSubCategories = await resSubCategories.json();
    subCategories = dataSubCategories.data.filter(i => i.parentCategoryId != null)

    const resProducts = await fetch(`${backendUrl}api/product/all`, { cache: "no-store", });
    const dataProducts = await resProducts.json();
    products = dataProducts.data.products
  } catch (err) {
    console.error("Blog fetch failed:", err);
  }

  const now = new Date().toISOString();

  const urls = [];

  // Homepage
  urls.push(`
    <url>
      <loc>${escapeXml(baseUrl)}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);

  // Static pages
  const staticPages = [
    { path: "/login", priority: "0.8", changefreq: "yearly" },
    { path: "/industries", priority: "0.8", changefreq: "weekly" },
    { path: "/categories", priority: "0.8", changefreq: "weekly" },
    { path: "/category", priority: "0.9", changefreq: "weekly" },
  ];

  staticPages.forEach((page) => {
    urls.push(`
      <url>
        <loc>${escapeXml(baseUrl + page.path)}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `);
  });

  // Dynamic industry pages
  industries.forEach((industry) => {
    urls.push(`
      <url>
        <loc>${escapeXml(
      `${baseUrl}/industries/${industry.slug}`
    )}</loc>
        <lastmod>${industry.updatedAt || now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // Dynamic categories pages
  categories.forEach((category) => {
    urls.push(`
      <url>
        <loc>${escapeXml(
      `${baseUrl}/categories/${category.slug}`
    )}</loc>
        <lastmod>${category.updatedAt || now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // Dynamic subCategories pages
  subCategories.forEach((category) => {
    urls.push(`
      <url>
        <loc>${escapeXml(
      `${baseUrl}/category/${category.slug}`
    )}</loc>
        <lastmod>${category.updatedAt || now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // Dynamic products pages
  products.forEach((product) => {
    urls.push(`
      <url>
        <loc>${escapeXml(
      `${baseUrl}/products/${product.slug}`
    )}</loc>
        <lastmod>${product.updatedAt || now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  subCategories.forEach((subCategory) => {
    locations.forEach((location) => {
      location.cities.forEach((city) => {
        urls.push(`
        <url>
          <loc>${escapeXml(
          `${baseUrl}/category/${subCategory.slug}/${encodeURIComponent(
            city.id.toLowerCase().replace(/\s+/g, "-")
          )}`
        )}</loc>
          <lastmod>${subCategory.updatedAt || now}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `);
      });
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}