"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductSlider({ products, loading1, details, setOpen, portfolio }) {

    const sliderProducts = useMemo(() => {
        if (!products.length) return [];

        if (products.length >= 5) return products;

        const repeated = [];
        while (repeated.length < 10) {
            repeated.push(...products);
        }

        return repeated;
    }, [products]);

    return (
<<<<<<< HEAD
        <section className="bg-gray-100 py-6 md:px-12 px-4">
           
=======
        <section className="bg-gray-100 md:py-6 md:px-12 px-2 py-2">
>>>>>>> 6bf97a6d50738009b304ae6c37c55acdb0d75a95
            <Swiper
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 5 },
                }}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={sliderProducts.length > 4}
                className="pb-4! pt-2!"
            >
                {loading1 ? Array.from({ length: 5 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm animate-pulse h-[400px] flex flex-col">
                            <div className="h-64 bg-gray-200" />

                            <div className="p-4 flex flex-col flex-1">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                                <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>

                                <div className="mt-auto h-12 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                )) : sliderProducts.slice(0, 10).map((product, index) => (
                    <SwiperSlide key={`${product.id}-${index}`}>
                        <motion.div whileHover={{ y: -6, transition: { duration: 0.2 }, }}
                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg h-[380px] flex flex-col"
                        >
                            <div className="w-full h-60 bg-white flex items-center justify-center p- overflow-hidden">
                                <img
                                    src={product.media?.[0]?.url || "/no-image.webp"}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition duration-300 hover:scale-105"
                                />
                            </div>

                            <div className="px-2 py-2 flex flex-col flex-1">
                                <h3 className="text-center flex justify-center items-center font-bold text-[20px] leading-[30px] text-gray-800 min-h-[60px] line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="mt-auto flex justify-between items-center gap-2">
                                    <button onClick={() => setOpen(true)} style={{ backgroundColor: details?.hero?.color || "#8B4513", }}
                                        className="w-full text-white py-2 px-1 rounded-md text- font-medium transition hover:opacity-90"
                                    >
                                        Get a Quote
                                    </button>

                                    <Link href={`/${portfolio}/${product.slug}`} style={{ borderColor: details?.hero?.color || "#8B4513", color: details?.hero?.color || "#8B4513", }}
                                        className="w-full border text-white py-2 rounded-md flex items-center justify-center gap-1 font-medium transition hover:opacity-90"
                                    >
                                        Read More <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}