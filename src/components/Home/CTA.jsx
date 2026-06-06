"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Phone, Send } from "lucide-react";
import axios from "axios";

export default function CTA() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      supplierToken: "7303486777",
      platform: "Dir Home Page",
      platformEmail: "lead.inquirybazaar@gmail.com",
      name: "NA",
      email: "NA",
      company: "NA",
      phone: formData.get("phone") || "NA",
      product: formData.get("product") || "NA",
      place: "NA",
      message: "NA",
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
        alert("Thank You!");
        setTimeout(() => {
          e.target.reset();      // reset after UI change
        }, 100);
      }
    } catch (err) {
      console.log("ERROR:", err?.response || err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A5B93] py-10 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center text-white"
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Get free quotes from multiple sellers
        </h2>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 md:p-6 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            {/* Product Input */}
            <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 flex-1">
              <Package className="text-gray-800" size={18} />
              <input
                name="product"
                type="text"
                placeholder="Product / Service"
                className="w-full outline-none text-sm text-gray-800"
              />
            </div>

            {/* Phone Input */}
            <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 flex-1">
              <Phone className="text-gray-800" size={18} />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full outline-none text-sm text-gray-800"
              />
            </div>

            {/* Button */}
            <motion.button
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-[#0A5B93] text-white px-6 py-2 rounded-lg font-medium"
            >
              <Send size={16} />
              {loading ? "Sending..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}