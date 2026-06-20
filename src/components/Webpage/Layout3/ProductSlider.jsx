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

  const [loadingType, setLoadingType] = useState(null);

  const trackEvent = async (eventType, productDetails) => {
    // console.log("Tracking Event:", eventType);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
        {
          productId: "N/A",
          supplierToken: productDetails?.user?._id,
          eventType,
          source: "Dir Web Page",
        }
      );
    } catch (error) {
      console.log("Tracking Error:", error);
    }
  };

  const handleWhatsappClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("whatsapp");

      await trackEvent("whatsapp_click", product);

      window.open(
        link,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  const handleCallClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("call");

      await trackEvent("call_click", product);

      window.location.href = `tel:${link}`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };
  // console.log(products)

  return (
    <section className="bg-white md:py-6 py-4 md:px-6 px-3">
      <div className="flex items-center justify-between md:mb-4 mb-2">
        <h2 className="text-lg md:text-2xl font-bold text-[#111827]">
          Top Products & Services
        </h2>

        <Link style={{ color: details?.hero?.color }} href={`/${portfolio}/products`} className="text-sm md:text-base font-semibold">
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
            <Link href={`/${portfolio}/${product.slug}`}
              key={product._id || index}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
            >
              {/* image */}
              <div className="relative h-[170px] bg-[#EEF2EF] flex items-center justify-center">
                <button onClick={(e) => { e.preventDefault(); setOpen(true); }}
                  className="absolute md:top-3 top-1 md:right-3 right-1 bg-[#156734] text-white text-xs font-semibold px-3 py-1 rounded-lg"
                >
                  Inquire
                </button>

                <img
                  src={product.media?.[0]?.url || "/no-image.webp"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="md:p-3 p-1">
                <h3 className="font-bold md:text-[18px] text-sm leading-tight text-black line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm md:mt-1">
                  {product.subCategoryId?.name || "Industrial Products"}
                </p>

                <button onClick={() => handleCallClick(details, details?.user?.phone)} disabled={loadingType !== null} className="text-[#ff6600] font-bold md:mt-2 animate-pulse">
                  Get Best Price
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}