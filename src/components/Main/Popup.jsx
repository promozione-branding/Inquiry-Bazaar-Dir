"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, MessageCircle, Package } from "lucide-react";
import { useState } from "react";

export default function Popup({ open, setOpen, details }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            supplierToken: details?.supplier?._id,
            platform: "Bar Bending Machine - Promote Bharat Dir Portfolio Form",
            platformEmail: "shreeshaktiinfratech@gmail.com",
            name: formData.get("contactPerson"),
            email: formData.get("email"),
            company: formData.get("company") || "NA",
            phone: formData.get("phone"),
            product: formData.get("product") || "NA",
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
                        className="fixed z-50 top-1/2 left-1/2 p-4 max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg overflow-hidden"
                    >

                        <div className="relative">
                            <button className="absolute -top-2 -right-1 text-gray-800 hover:text-black" onClick={() => setOpen(false)}>
                                <X />
                            </button>
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
                            ) : (<form onSubmit={handleSubmit} className="space-y-4">
                                <h2 className="mb-6 font-semibold text-3xl text-[#0A5B93] flex flex-col justify-center items-center">
                                    Contact Supplier
                                    <div className="w-15 h-1 rounded-2xl bg-[#0A5B93] mt-1"></div>
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
                                    <Package size={16} className="text-[#0A5B93]" />
                                    <input
                                        name="product"
                                        type="text"
                                        placeholder="Enter Product Name"
                                        className="w-full p-2 outline-none text-black"
                                    />
                                </div>

                                <div className="flex justify-between items-center gap-2">
                                    <div className="w-full flex items-center border rounded-lg px-2 border-gray-400">
                                        <Mail size={16} className="text-[#0A5B93]" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="w-full flex items-center border rounded-lg px-2 border-gray-400">
                                        <Phone size={16} className="text-[#0A5B93]" />
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start border rounded-lg px-2 border-gray-400">
                                    <MessageCircle size={16} className="text-[#0A5B93] mt-3" />
                                    <textarea
                                        name="message"
                                        rows={5}
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