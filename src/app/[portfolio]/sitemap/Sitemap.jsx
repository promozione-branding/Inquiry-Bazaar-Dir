"use client"
import Footer from '@/components/Webpage/Footer';
import Navbar from '@/components/Webpage/Navbar'
import axios from 'axios';
import { Home, Info, Mail, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from 'react'
import Link from "next/link";

export default function Sitemap() {
    const { portfolio } = useParams()
    const [details, setDetails] = useState(null)
    const [loadingPage, setLoadingPage] = useState(true);
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const navLinks = [
        { name: "Home", href: `/${portfolio}#home`, icon: Home },
        { name: "About", href: `/${portfolio}#about-us`, icon: Info },
        { name: "Products", href: `/${portfolio}/products`, icon: ShoppingBag },
        { name: "Contact", href: `/${portfolio}#contact-us`, icon: Mail },
    ];

    useEffect(() => {
        if (!portfolio) return;

        const fetchData = async () => {
            try {
                setLoadingPage(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`);
                // console.log("API Response:", res.data);
                if (res.status !== 200 || !res.data || Object.keys(res.data).length === 0) {
                    router.replace("/");
                    return;
                }
                console.log(res.data.data)
                setProducts(res.data.data?.products || []);
                setDetails(res.data.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 404) {
                    router.replace("/");
                } else {
                    router.replace("/");
                }
            } finally {
                setLoadingPage(false);
            }
        };

        fetchData();
    }, [portfolio, router]);

    const grouped = useMemo(() => {
        return products.reduce((acc, item) => {
            const category =
                item.subCategoryId?.name || "Uncategorized";

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(item);

            return acc;
        }, {});
    }, [products]);

    return (<>
        <Navbar details={details} portfolio={portfolio} navLinks={navLinks} />

        <section className="bg-gray-50 min-h-screen text-black">
            <div className="px-4 md:px-10 flex">
                <aside className="w-[280px] hidden lg:block sticky top-20 h-screen bg-white border-r border-gray-300 p-8">
                    <h2 className="text-3xl font-semibold mb-8">
                        Sitemap
                    </h2>

                    <nav className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-3">
                                Company
                            </h3>

                            <ul className="space-y-2">
                                {navLinks.map((i, idx) => (
                                    <li>
                                        <Link href={i?.href}>
                                            {i?.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">
                                Products
                            </h3>

                            <ul className="space-y-2">
                                {Object.keys(grouped).map(
                                    (category) => (
                                        <li key={category}>
                                            <a href={`#${category}`} className="text-gray-600 hover:text-blue-600">
                                                {category}
                                            </a>
                                        </li>)
                                )}
                            </ul>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 md:p-8 p-4">
                    <h1 className="text-4xl font-bold mb-10">
                        Our Products
                    </h1>

                    {Object.entries(grouped).map(([category, items]) => (
                        <section key={category} id={category} className="mb-16" style={{ scrollMarginTop: "100px" }}>
                            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
                                {category}
                            </h2>

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {items.map((product) => (
                                    <Link key={product._id} href={`/${portfolio}/${product.slug}`}
                                        className="bg-white rounded-xl border border-gray-300 hover:shadow-lg transition overflow-hidden"
                                    >
                                        <div className="flex p-4">
                                            <img
                                                src={product?.media?.[0]?.url || "/placeholder.png"}
                                                alt={product.name}
                                                className="w-28 h-28 object-cover rounded-lg"
                                            />

                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-medium line-clamp-2">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-3 text-gray-500">
                                                    Approx. Price
                                                </p>

                                                <div className="text-blue-600 font-semibold">
                                                    Rs {product.price}
                                                    {" "} / {product.unit}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )
                    )}
                </main>
            </div>
        </section>

        <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
    </>)
}
