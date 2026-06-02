"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

export default function Categories() {
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

  return (<>
    <Navbar />

    <section className="px-4 md:px-10 py-8 bg-gray-50 w-full">
      <div className="mb-5 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Categories
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-7">
        {loading ? (
          [...Array(8)].map((_, index) => (
            <div key={index} className="overflow-hidden rounded-[22px] md:rounded-[28px] bg-gray-200 border border-orange-100 shadow-sm">
              <div className="h-40 md:h-72 bg-gray-300 animate-pulse" />
            </div>
          ))
        ) : (categories.map((item, idx) => (
          <Link
            key={item?.id || idx}
            href={`/categories/${item?.slug}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.2,
                delay: idx * 0.02,
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

    <Footer />
  </>)
}
