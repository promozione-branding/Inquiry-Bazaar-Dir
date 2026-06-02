import React from 'react'
import { motion } from "framer-motion";
import { Eye } from 'lucide-react';
import Link from 'next/link';

export default function ProductsList({ products, loading1, details, setOpen }) {
    // console.log("ProductsList Rendered with products:", products, "loading1:", loading1);
    return (
        <div className="max-w-7xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                    Our Popular Products
                </h2>
                <p className="text-gray-500 mt-2">
                    Explore our most demanded and trusted products
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading1 ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-gray-200 border border-gray-300 rounded-xl shadow-sm animate-pulse">
                        <div className='h-60 bg-white rounded-xl w-full border border-gray-300'>

                        </div>
                        <div className="p-3">
                            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        </div>
                    </div>
                )) : products.slice(0, 6).map((product, index) => (
                    <motion.div key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1, }}
                        viewport={{ once: false }}
                        whileHover={{ y: -8 }}
                        className="relative bg-white rounded-xl shadow-sm border overflow-hidden group border-gray-200"
                    >
                        <div className="w-full h-60 overflow-hidden">
                            <img
                                src={product.media?.[0]?.url || "/no-image.webp"}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <div className="absolute inset-0 flex items-end justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300">
                            <Link href={`/products/${product.slug}`} style={{ backgroundColor: details?.hero?.color || "#8B4513", }} className="text-white p-3 rounded-full shadow-lg hover:scale-110 transition mb-15">
                                <Eye size={20} />
                            </Link>
                        </div>

                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
