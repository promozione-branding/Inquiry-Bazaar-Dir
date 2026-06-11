"use client"
import Footer from '@/components/Webpage/Footer';
import Navbar from '@/components/Webpage/Navbar'
import axios from 'axios';
import { Home, IndianRupee, Info, Mail, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import {
    Package,
    Truck,
    Layers3,
    BadgeIndianRupee,
    Boxes,
} from "lucide-react";
import Link from 'next/link';

export default function Products() {
    const { portfolio } = useParams()
    const router = useRouter();
    const [details, setDetails] = useState(null)
    const [loadingPage, setLoadingPage] = useState(true);
    const [products, setProducts] = useState([]);
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

    // console.log(products)

    const groupedProducts = products.reduce((acc, product) => {
        const categoryName = product.subCategoryId?.name || "Uncategorized";

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }

        acc[categoryName].push(product);

        return acc;
    }, {});

    const categories = Object.keys(groupedProducts);

    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        if (categories.length && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    return (<>
        <Navbar details={details} portfolio={portfolio} navLinks={navLinks} />

        <div className="min-h-screen bg-slate-50">
            <section className="bg-white border-b px-4 py-4 text-center">
                <div className="flex items-center gap-3 justify-center">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    <h1 className="text-4xl font-bold text-slate-900">
                        Our Products
                    </h1>
                </div>
            </section>

            <div className="xl:px-20 md:px-15 px-4 py-10">
                {Object.entries(groupedProducts).length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                        <Package className="mx-auto h-14 w-14 text-slate-400 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800">
                            No Products Available
                        </h3>
                        <p className="text-slate-500 mt-2">
                            Products will appear here once added.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {categories.map((category) => (
                                <button key={category} onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300
                        ${selectedCategory === category
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600"
                                        }`}
                                >
                                    {category}
                                    <span className="ml-2 text-sm opacity-80">
                                        ({groupedProducts[category].length})
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Layers3 className="w-6 h-6 text-blue-600" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {selectedCategory}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    {groupedProducts[selectedCategory]?.length || 0} Products
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {groupedProducts[selectedCategory]?.map((product) => (
                                <Link href={`products/${product?.slug}`} key={product._id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative h-75 overflow-hidden">
                                        <img
                                            src={product.media?.[0]?.url}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="absolute top-3 right-3">
                                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                {product.brandName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-5 py-2">
                                        <h3 className="font-semibold flex items-center text-slate-900 line-clamp-2 min-h-[56px]">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="flex items-center text-green-600">
                                                <IndianRupee className="w-5 h-5" />
                                                <span className="text-2xl font-bold">
                                                    {product.price}
                                                </span>
                                            </div>

                                            {product.oldPrice > product.price && (
                                                <span className="text-sm text-slate-400 line-through">
                                                    ₹{product.oldPrice}
                                                </span>
                                            )}

                                            {product.oldPrice > product.price && (
                                                <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                                    {Math.round(
                                                        ((product.oldPrice -
                                                            product.price) /
                                                            product.oldPrice) *
                                                        100
                                                    )}
                                                    % OFF
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-slate-500">
                                            Per {product.unit || "Unit"}
                                            {product.priceType === "starting" && (
                                                <span className="text-blue-600 ml-1">
                                                    (Starting Price)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>

        <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
    </>)
}
