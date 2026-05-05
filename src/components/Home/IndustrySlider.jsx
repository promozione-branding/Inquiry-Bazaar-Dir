"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import axios from "axios";

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

    const loopedIndustries =
        industries.length < 6
            ? [...industries, ...industries, ...industries]
            : industries;

    return (
        <div className="pt-10 pb-4 px-4 w-full overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={800} // smoother animation
                breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                className="pb-10!"
            >
                {loopedIndustries.map((item, index) => (
                    <SwiperSlide key={`${item?._id}-${index}`}>
                        <Link href={`/industries/${item?.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition h-55 flex flex-col justify-center items-center"
                            >
                                <div className="w-full h-40 mb-3">
                                    <img
                                        src={item?.imageUrl}
                                        alt={item?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-md font-semibold text-gray-800 text-center">
                                    {item?.name}
                                </h3>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}