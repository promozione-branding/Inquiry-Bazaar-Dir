"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import {
    ArrowRight,
    ArrowUpRight,
    BriefcaseBusiness,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function IndustrySlider() {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/industries`);
                // console.log("Fetched Industries:", res);
                setIndustries(res?.data?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const loopedIndustries = industries.length > 0 && industries.length < 6
        ? [...industries, ...industries, ...industries] : industries;

    return (
        <div className="w-full px-4 md:px-6 md:pt-10 pt-5 overflow-hidden bg-linear-to-b from-white to-orange-50">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-[#EC771C] uppercase tracking-wider">
                        Explore
                    </p>

                    <h2 className="text-lg md:text-3xl font-bold text-gray-900">
                        Popular Industries
                    </h2>
                </div>

                <Link href="/industries"
                    className="text-[#EC771C] flex items-center gap-2 hover:underline"
                >
                    View All

                    <ArrowRight
                        size={22}
                        className="bg-[#EC771C] p-1 rounded-full text-white"
                    />
                </Link>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={loopedIndustries.length > 1}
                speed={900}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                }}
                className="md:pb-12! md:pt-6! pt-2! pb-10! lg:px-4!"
            >
                {loading ? [...Array(5)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="overflow-hidden rounded-3xl bg-white border border-orange-100 shadow-sm">
                            <div className="h-60 bg-gray-200 animate-pulse" />

                            <div className="px-5 py-4">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    </SwiperSlide>
                )) : (loopedIndustries.map((item, index) => (
                    <SwiperSlide key={`${item?._id}-${index}`}>
                        <Link href={`/industries/${item?.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-3xl bg-white border border-orange-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-40 md:h-60 overflow-hidden">
                                    <img
                                        src={item?.imageUrl}
                                        alt={item?.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md">
                                        <BriefcaseBusiness
                                            size={18}
                                            className="text-[#EC771C]"
                                        />
                                    </div>

                                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                                        <h3 className="text-sm md:text-xl font-bold text-white line-clamp-1">
                                            {item?.name}
                                        </h3>

                                        <p className="text-xs md:text-sm text-gray-200 mt-1">
                                            Explore opportunities
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-2 md:px-5 md:py-4">
                                    <span className="text-sm font-medium text-gray-800">
                                        View Industry
                                    </span>

                                    <motion.div whileHover={{ rotate: 45 }}
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 text-[#EC771C] group-hover:bg-[#EC771C] group-hover:text-white transition-all"
                                    >
                                        <ArrowUpRight size={18} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>)
                ))}
            </Swiper>
        </div>
    );
}