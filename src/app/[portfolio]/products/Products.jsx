"use client"
import Footer from '@/components/Webpage/Footer';
import Navbar from '@/components/Webpage/Navbar'
import axios from 'axios';
import { Home, IndianRupee, Info, Mail, Menu, ShoppingBag } from 'lucide-react';
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
import StickyButtons from '@/components/Webpage/StickyButtons';
import Stickyfooter from '@/components/Webpage/StickyFooter';
import Navbar3 from '@/components/Webpage/Layout3/Navbar';
import Navbar2 from '@/components/Webpage/Layout/Navbar';

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

    const NavbarComponent = portfolio === "sangam-plastic-industries" ? Navbar3
        : portfolio === "matrix-tissue" ? Navbar2 : Navbar;

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    return (<>
        <NavbarComponent
            details={details}
            portfolio={portfolio}
            navLinks={navLinks}
        />

        <div className="min-h-screen bg-slate-50">
            <section className="bg-white border-b px-4 py-4 text-center">
                <div className="flex items-center gap-3 justify-center">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    <h1 className="md:text-4xl text-2xl font-bold text-slate-900">
                        Our Products
                    </h1>
                </div>
            </section>

            <div className="xl:px-20 md:px-15 px-2 md:py-10 py-4">
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
                        {/* Desktop Categories */}
                        <div className="hidden md:flex flex-wrap gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2.5 rounded-full font-medium transition-all
            ${selectedCategory === category
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-blue-500"
                                        }`}
                                >
                                    {category}
                                    <span className="ml-2 text-sm opacity-80">
                                        ({groupedProducts[category].length})
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Button */}
                        {/* <div className="md:hidden mb-5">
                            <button
                                onClick={() => setIsCategoryOpen(true)}
                                className="w-full bg-white border text-black rounded-xl px-4 py-3 flex justify-between items-center"
                            >
                                <span>{selectedCategory}</span>
                                <Layers3 className="w-5 h-5" />
                            </button>
                        </div> */}

                        {/* Mobile Sidebar */}
                        <div className={`fixed inset-0 z-50 transition-all duration-300
                            ${isCategoryOpen ? "visible bg-black/40" : "invisible bg-black/0"}`}>
                            {/* Drawer */}
                            <div onClick={() => setIsCategoryOpen(false)}
                                className={`absolute inset-0 bg-black transition-opacity duration-300
        ${isCategoryOpen
                                        ? "opacity-40"
                                        : "opacity-0"
                                    }`}
                            />

                            <div className={`absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl p-5
                        transform transition-transform duration-300 ${isCategoryOpen ? "translate-x-0" : "-translate-x-full"}`}>
                                <div className="flex justify-between items-center pb-3 mb-5 border-b border-b-gray-400 text-black">
                                    <h3 className="text-lg font-bold">
                                        Categories
                                    </h3>

                                    <button onClick={() => setIsCategoryOpen(false)}>
                                        ✕
                                    </button>
                                </div>

                                <div className="relative space-y-2">
                                    {categories.map((category) => (
                                        <button key={category} onClick={() => { setSelectedCategory(category); setIsCategoryOpen(false); }}
                                            className={`w-full text-left px-4 py-3 rounded-lg
                                        ${selectedCategory === category ? "bg-blue-600 text-white" : "hover:bg-slate-100 text-black"}`}>
                                            {category}
                                            <span className="ml-2 text-sm">
                                                ({groupedProducts[category].length})
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Backdrop Close */}
                            {/* <div
                                className="absolute inset-0"
                                onClick={() => setIsCategoryOpen(false)}
                            /> */}
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg md:flex hidden">
                                <Layers3 className="w-6 h-6 text-blue-600" />
                            </div>

                            <div className='md:hidden flex'>
                                <button onClick={() => setIsCategoryOpen(true)}
                                    className="w-full bg-white border border-blue-400 text-black rounded-md p-2 flex justify-between items-center"
                                >
                                    <Menu className="w-6 h-6 text-blue-600" />
                                </button>
                            </div>

                            <div>
                                <h2 className="md:text-2xl text-lg font-bold text-slate-900">
                                    {selectedCategory}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    {groupedProducts[selectedCategory]?.length || 0} Products
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-3">
                            {groupedProducts[selectedCategory]?.map((product) => (
                                <Link href={`/${portfolio}/${product?.slug}`} key={product._id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative md:h-75 overflow-hidden">
                                        <img
                                            src={product.media?.[0]?.url}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="absolute sm:top-3 sm:right-3">
                                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                {product.brandName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="md:px-5 md:py-2 p-2">
                                        <h3 className="font-semibold text-slate-900 line-clamp-1 md:text-base text-xs md:line-clamp-2 md:min-h-14">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-2 flex-wrap md:mt-0 mt-1">
                                            <div className="flex items-center text-green-600">
                                                <IndianRupee className="md:w-5 md:h-5 w-3 h-3" />
                                                <span className="md:text-2xl text-xs font-bold">
                                                    {product.price}
                                                </span>
                                            </div>

                                            {product.oldPrice > product.price && (
                                                <span className="md:text-sm text-xs text-slate-400 line-through">
                                                    ₹{product.oldPrice}
                                                </span>
                                            )}

                                            {product.oldPrice > product.price && (
                                                <span className="md:text-xs text-[10px] font-medium bg-red-100 text-red-600 md:px-2 px-1 py-1 rounded-full">
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

                                        <p className="md:flex hidden text-sm text-slate-500">
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

        <StickyButtons details={details} />
        <Stickyfooter details={details} portfolio={portfolio} />
        <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
    </>)
}
