"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Tag, IndianRupee, Store, MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function HomePopup({ productImage }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!productImage) return;

        const timer = setTimeout(() => {
            setOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, [productImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            supplierToken: "7303486777",
            platform: "Dir Category Page Popup",
            platformEmail: "lead.inquirybazaar@gmail.com",
            name: formData.get("contactPerson"),
            email: formData.get("email"),
            company: formData.get("company") || "NA",
            phone: formData.get("phone"),
            product: "NA",
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
        } finally {
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
                                <div className="relative rounded-xl overflow-hidden h-full">

                                    <img
                                        src={productImage}
                                        alt="Requirement"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold">
                                            Get the Best Deals
                                        </h3>

                                        <p className="text-sm mt-2 opacity-90">
                                            Share your requirement and receive quotes
                                            from verified sellers.
                                        </p>
                                    </div>
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
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-[#0A5B93]">
                                            Looking for?
                                        </h2>

                                        <p className="text-gray-600 mt-1 text-sm">
                                            Let us know your requirement, and get quotes from
                                            <span className="font-semibold text-orange-500">
                                                {" "}trusted sellers!
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <User size={16} className="text-orange-500" />
                                        <input
                                            name="contactPerson"
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <Mail size={16} className="text-orange-500" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <Phone size={16} className="text-orange-500" />
                                        <input
                                            maxLength={10}
                                            minLength={10}
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-start border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <MessageCircle size={16} className="text-orange-500 mt-3" />
                                        <textarea
                                            name="message"
                                            type="text"
                                            rows={4}
                                            placeholder="Your Requirement"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <button disabled={loading} className="w-full bg-[#0A5B93] hover:bg-[#074f83] text-white py-2 rounded-lg">
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