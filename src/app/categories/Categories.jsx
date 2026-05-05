"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import axios from "axios";

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
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((item, idx) => (
          <Link key={item?.id || idx} href={`/categories/${item?.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-70 overflow-hidden">
                <img
                  src={item?.imageUrl}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition"></div>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-sm md:text-lg font-semibold">
                  {item?.name}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>

    <Footer />
  </>)
}
