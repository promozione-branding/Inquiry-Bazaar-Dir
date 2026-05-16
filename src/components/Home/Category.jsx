"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, } from "lucide-react";
import axios from "axios";

export default function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/category?type=main");
                setCategories(res.data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="relative px-4 md:px-10 py-12 overflow-hidden bg-linear-to-b bg-white">

            <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />

            <div className="relative z-10 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[4px] font-semibold text-orange-500">
                        Discover
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Categories You May Like
                    </h2>
                </div>

                <Link href="/categories"
                    className="text-[#f45a06] hidden sm:flex items-center gap-2 hover:underline"
                >
                    View All

                    <ArrowRight
                        size={22}
                        className="bg-[#f45a06] p-1 rounded-full text-white"
                    />
                </Link>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {categories.slice(0, 8).map((item, idx) => (
                    <Link key={item?.id || idx} href={`/categories/${item?.slug}`}>
                        <motion.div initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: -10,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: idx * 0.05,
                            }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-[28px] bg-white border border-orange-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={item?.imageUrl}
                                    alt={item?.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white line-clamp-1">
                                                {item?.name}
                                            </h3>

                                            <p className="text-sm text-gray-200 mt-1">
                                                Explore premium opportunities
                                            </p>
                                        </div>

                                        <motion.div whileHover={{ rotate: 45 }}
                                            className="flex items-center justify-center min-w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white group-hover:bg-orange-500 transition-all duration-300"
                                        >
                                            <ArrowUpRight size={20} />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-100 origin-left" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}