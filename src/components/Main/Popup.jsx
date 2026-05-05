"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, MessageCircle, Package } from "lucide-react";

export default function Popup({ open, setOpen }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed z-50 top-1/2 left-1/2 p-4 max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg overflow-hidden"
                    >

                        <div className="relative">
                            <button className="absolute -top-2 -right-1 text-gray-800 hover:text-black" onClick={() => setOpen(false)}>
                                <X />
                            </button>

                            <div className="space-y-4">
                                <h2 className="mb-6 font-semibold text-2xl text-[#0A5B93] flex flex-col justify-center items-center">
                                    Contact Supplier
                                    <div className="w-15 h-1 rounded-2xl bg-[#0A5B93] mt-1"></div>
                                </h2>   

                                <div className="flex items-center border rounded-lg px-2 border-gray-400">
                                    <User size={16} className="text-[#0A5B93]" />
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full p-2 outline-none text-black"
                                    />
                                </div>

                                <div className="flex items-center border rounded-lg px-2 border-gray-400">
                                    <Package size={16} className="text-[#0A5B93]" />
                                    <input
                                        type="text"
                                        placeholder="Enter Product Name"
                                        className="w-full p-2 outline-none text-black"
                                    />
                                </div>

                                <div className="flex justify-between items-center gap-2">
                                    <div className="w-full flex items-center border rounded-lg px-2 border-gray-400">
                                        <Mail size={16} className="text-[#0A5B93]" />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="w-full flex items-center border rounded-lg px-2 border-gray-400">
                                        <Phone size={16} className="text-[#0A5B93]" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start border rounded-lg px-2 border-gray-400">
                                    <MessageCircle size={16} className="text-[#0A5B93] mt-3" />
                                    <textarea
                                        type="text"
                                        rows={5}
                                        placeholder="Your Message"
                                        className="w-full p-2 outline-none text-black"
                                    />
                                </div>

                                <button className="w-full bg-[#0A5B93] text-white py-2 rounded-lg">
                                    Send Inquiry
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}