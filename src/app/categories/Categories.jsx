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

  return (<>
    <Navbar />

    <section className="px-4 md:px-10 py-8 bg-gray-50 w-full">
      <div className="mb-5 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Categories
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {categories.map((item, idx) => (
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

    <Footer />
  </>)
}
