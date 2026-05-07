"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Tag, IndianRupee, Store, MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactModal({ open, setOpen, product }) {
    const supplier = product?.supplier?.business || product?.supplierId?.business || null;
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            supplierToken: product?.supplier?._id || product?.supplierId?._id,
            platform: "Promote Bharat Dir Product Popup",
            platformEmail: product?.supplier?.email || product?.supplierId?.email || "mail@mail.com",
            name: formData.get("contactPerson"),
            email: formData.get("email"),
            company: formData.get("company") || "NA",
            phone: formData.get("phone"),
            product: product.name || "NA",
            place: formData.get("city") || "NA",
            message: formData.get("message"),
        };

        if (!/^\d{10}$/.test(data.phone)) {
            return alert("Enter a valid 10-digit phone number");
        }

        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/add`, data,
                { validateStatus: (status) => status >= 200 && status < 500 }
            );
            if (res.status >= 200 && res.status < 300) {
                setSubmitted(true);
                setTimeout(() => {
                    e.target.reset();      // reset after UI change
                }, 100);
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
            }
        } catch (err) {
            console.log("ERROR:", err?.response || err.message);
            alert("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

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
                        className="fixed z-50 top-1/2 left-1/2 md:w-[60%] w-[90%] p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg overflow-hidden"
                    >

                        <div className="grid md:grid-cols-2 gap-8 relative">
                            <button className="absolute -top-2 -right-1 text-gray-800 hover:text-black" onClick={() => setOpen(false)}>
                                <X />
                            </button>

                            <div className="md:flex flex-col hidden">
                                <div className="border border-gray-200 rounded-lg w-auto h-70">
                                    <img
                                        src={product.media?.[0]?.url}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <Link href={`/products/${product?.slug}`} className="hover:underline text-center font-semibold mt-2 text-[#0A5B93]">
                                    {product.name}
                                </Link>

                                <div className='flex items-center justify-between mt-1'>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        {product.price ? (
                                            <p className="text-lg font-semibold">
                                                ₹{product.price}
                                                <span className="text-sm font-normal">/Piece</span>
                                            </p>
                                        ) : (
                                            <span className="bg-green-500 text-xs text-white px-2 py-1 rounded-xl">
                                                On Request
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Store size={16} />
                                        <span>{supplier?.companyName || "Unknown Supplier"}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-center mt-2">
                                    {supplier?.social?.linkedin && (
                                        <a
                                            href={supplier.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="LinkedIn"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                        >
                                            <FaLinkedin size={18} className="text-blue-700" />
                                        </a>
                                    )}

                                    {supplier?.social?.instagram && (
                                        <a
                                            href={supplier.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Instagram"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-pink-100 transition hover:scale-105"
                                        >
                                            <FaInstagram size={18} className="text-pink-600" />
                                        </a>
                                    )}

                                    {supplier?.social?.facebook && (
                                        <a
                                            href={supplier.social.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Facebook"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                        >
                                            <FaFacebook size={18} className="text-blue-600" />
                                        </a>
                                    )}

                                    {supplier?.social?.youtube && (
                                        <a
                                            href={supplier.social.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="YouTube"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition hover:scale-105"
                                        >
                                            <FaYoutube size={18} className="text-red-600" />
                                        </a>
                                    )}

                                    {supplier?.social?.telegram && (
                                        <a
                                            href={supplier.social.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Telegram"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                        >
                                            <BsTelegram size={18} className="text-blue-600" />
                                        </a>
                                    )}

                                    {supplier?.social?.twitter && (
                                        <a
                                            href={supplier.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Twitter"
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                                        >
                                            <FaXTwitter size={18} className="text-black" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {submitted ? (
                                <div className="text-center py-10">
                                    <h2 className="text-2xl font-bold text-amber-600">
                                        🎉 Thank You!
                                    </h2>
                                    <p className="text-gray-800 mt-2">
                                        Your enquiry has been submitted successfully.
                                    </p>
                                    <p className="text-gray-700 text-sm mt-1">
                                        Our team will contact you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h2 className="font-semibold text-3xl text-[#D01132] text-center">
                                        Contact Supplier
                                    </h2>
                                    <div className="flex items-center border rounded-lg px-2 border-gray-400">
                                        <User size={16} className="text-[#0A5B93]" />
                                        <input
                                            name="contactPerson"
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-400">
                                        <Mail size={16} className="text-[#0A5B93]" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-400">
                                        <Phone size={16} className="text-[#0A5B93]" />
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-start border rounded-lg px-2 border-gray-400">
                                        <MessageCircle size={16} className="text-[#0A5B93] mt-3" />
                                        <textarea
                                            name="message"
                                            type="text"
                                            rows={4}
                                            placeholder="Your Message"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <button disabled={loading} className="w-full bg-[#0A5B93] text-white py-2 rounded-lg">
                                        {loading ? "Submitting..." : "Submit Inquiry"}
                                    </button>
                                </form>)}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}