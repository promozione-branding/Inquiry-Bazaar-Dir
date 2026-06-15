"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  ChevronRight,
  Mail,
} from "lucide-react";

export default function RequestForm({ details }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    "Verified Supplier",
    "Direct Factory Pricing",
    "Genuine Products",
    "Fast Response",
    "Secure & Safe Inquiry",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      supplierToken: details?.user?._id,
      platform: "Inquiry Bazaar Dir Portfolio Form",
      platformEmail: "shreeshaktiinfratech@gmail.com",

      name: formData.get("contactPerson"),
      email: formData.get("email"),
      company: "NA",
      phone: formData.get("phone"),
      product: formData.get("product"),
      place: "NA",
      message: "NA",
    };

    if (!/^\d{10}$/.test(data.phone)) {
      return alert("Enter a valid 10-digit phone number");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/add`,
        data,
        {
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );

      if (res.status >= 200 && res.status < 300) {
        setSubmitted(true);
        e.target.reset();

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" id="quote-form">
      <section className="px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-gray-100 border border-gray-200 rounded-3xl p-6 md:p-8">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
            
            {/* Form */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1d376d]">
                  GET BEST WHOLESALE PRICE
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <ShieldCheck size={16} />
                  <span>Inquiry Bazaar Secure Inquiry</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">

                  {/* Name */}
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="contactPerson"
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="phone"
                      required
                      maxLength={10}
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Product Requirement */}
                  <div className="relative">
                    <Package
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="product"
                      required
                      type="text"
                      placeholder="Product Requirement"
                      className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-500"
                    />
                  </div>

                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-100 border border-green-200 text-green-700 rounded-xl p-3 text-center font-medium">
                    Inquiry submitted successfully!
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "REQUEST QUOTATION"}

                  {!loading && <ChevronRight size={22} />}
                </button>
              </form>
            </div>

            {/* Benefits */}
            <div className="space-y-2 lg:space-y-7">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-5">
                  <CheckCircle2
                    size={24}
                    className="text-green-500"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}