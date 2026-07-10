"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, } from "lucide-react";
import axios from "axios";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/categories/main`);
                // console.log(res?.data);
                setCategories(res?.data?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="relative px-4 md:px-10 py-10 overflow-hidden bg-linear-to-b bg-white">

            <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />

            <div className="relative z-10 mb-6 flex md:items-center items-start justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[4px] font-semibold text-[#EC771C]">
                        Discover
                    </p>

                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Categories You May Like
                    </h2>
                </div>

                <Link href="/categories"
                    className="text-[#EC771C] flex text-nowrap items-center gap-2 hover:underline"
                >
                    View All

                    <ArrowRight
                        size={22}
                        className="bg-[#EC771C] p-1 rounded-full text-white"
                    />
                </Link>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-7">
                {loading ? (
                    [...Array(8)].map((_, index) => (
                        <div key={index} className="overflow-hidden rounded-[22px] md:rounded-[28px] bg-gray-200 border border-orange-100 shadow-sm">
                            <div className="h-40 md:h-72 bg-gray-300 animate-pulse" />
                        </div>
                    ))
                ) : (categories.slice(0, 8).map((item, idx) => (
                    <Link
                        key={item?.id || idx}
                        href={`/categories/${item?.slug}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{
                                duration: 0.45,
                                delay: idx * 0.05,
                            }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-[22px] md:rounded-[28px] bg-white border border-orange-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >

                            {/* IMAGE */}
                            <div className="relative h-40 md:h-72 overflow-hidden">
                                <img
                                    src={item?.imageUrl}
                                    alt={item?.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* CONTENT */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                                    <div className="flex items-end justify-between gap-3">

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm md:text-2xl font-bold text-white line-clamp-1">
                                                {item?.name}
                                            </h3>

                                            <p className="text-xs md:text-sm text-gray-200 mt-1 line-clamp-1">
                                                Explore premium opportunities
                                            </p>
                                        </div>

                                        {/* ICON */}
                                        <motion.div
                                            whileHover={{ rotate: 45 }}
                                            className="hidden sm:flex items-center justify-center min-w-9 h-9 md:min-w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white group-hover:bg-orange-500 transition-all duration-300"
                                        >
                                            <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                                        </motion.div>

                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM BORDER ANIMATION */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </motion.div>
                    </Link>)
                ))}
            </div>
        </section>
    );
}