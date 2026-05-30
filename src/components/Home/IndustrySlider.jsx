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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/industry");
                setIndustries(res.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const loopedIndustries = industries.length > 0 && industries.length < 6
        ? [...industries, ...industries, ...industries] : industries;

    return (
        <div className="w-full px-4 md:px-6 pt-10 overflow-hidden bg-linear-to-b from-white to-orange-50">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        Explore
                    </p>

                    <h2 className="text-lg md:text-3xl font-bold text-gray-900">
                        Popular Industries
                    </h2>
                </div>

                <Link href="/industries"
                    className="text-[#f45a06] hidden sm:flex items-center gap-2 hover:underline"
                >
                    View All

                    <ArrowRight
                        size={22}
                        className="bg-[#f45a06] p-1 rounded-full text-white"
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
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
                className="pb-12! pt-6! lg:px-4!"
            >
                {loopedIndustries.map((item, index) => (
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
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={item?.imageUrl}
                                        alt={item?.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md">
                                        <BriefcaseBusiness
                                            size={18}
                                            className="text-orange-500"
                                        />
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white line-clamp-1">
                                            {item?.name}
                                        </h3>

                                        <p className="text-sm text-gray-200 mt-1">
                                            Explore opportunities
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-sm font-medium text-gray-800">
                                        View Industry
                                    </span>

                                    <motion.div whileHover={{ rotate: 45 }}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all"
                                    >
                                        <ArrowUpRight size={18} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}