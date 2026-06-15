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
      <section className="bg-[#f5f5f5] py-6 md:px-6 px-3">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold text-[#111827]">
      Top Products & Services
    </h2>

    <Link
      href={`/${portfolio}/products`}
      className="text-[#156734] font-semibold"
    >
      View All →
    </Link>
  </div>

  {loading1 ? (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border animate-pulse overflow-hidden"
        >
          <div className="h-[180px] bg-gray-200" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {products.slice(0, 6).map((product, index) => (
        <Link
          href={`/${portfolio}/${product.slug}`}
          key={product._id || index}
          className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
        >
         {/* image */}
          <div className="relative h-[170px] bg-[#EEF2EF] flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="absolute top-3 right-3 bg-[#156734] text-white text-xs font-semibold px-3 py-1 rounded-lg"
            >
              Inquire
            </button>

            <img
              src={product.media?.[0]?.url || "/no-image.webp"}
              alt={product.name}
              className="w-24 h-24 object-contain"
            />
          </div>

        
          <div className="p-3">
            <h3 className="font-bold text-[18px] leading-tight text-black line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              {product.category?.name || "Industrial Products"}
            </p>

            <p className="text-[#ff6600] font-bold mt-2">
              Get Best Price
            </p>
          </div>
        </Link>
      ))}
    </div>
  )}
</section>
    );
}