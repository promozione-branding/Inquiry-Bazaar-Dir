"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Send,
  Phone,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  ChevronRight,
  Mail,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
export default function RequestForm({ details, products }) {
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
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-50 to-gray-100 border border-gray-200 rounded-3xl p-6 md:p-8">
          <div className="grid gap-8 items-center">

            {/* Form */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Mail size={18} className="text-[#156734]" />
                <h2 className="text-xl font-bold text-[#111827]">
                  Send Your Requirement
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <ShieldCheck size={16} />
                  <span>Inquiry Bazaar Secure Inquiry</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 text-black">


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








                  <div className="relative">
                    <Package
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                    />

                    <select
                      name="product"
                      required
                      defaultValue=""
                      className="w-full h-14 pl-12 pr-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-500 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select Product Category
                      </option>

                      {products?.slice(0, 50).map((product) => (
                        <option
                          key={product._id}
                          value={product.name}
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>




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


                {submitted && (
                  <div className="bg-green-100 border border-green-200 text-green-700 rounded-xl p-3 text-center font-medium">
                    Inquiry submitted successfully!
                  </div>
                )}


                <button
                  type="submit"
                  disabled={loading}
                  className="
  w-full
  h-[60px]
  rounded-2xl
  bg-[#156734]
  text-white
  font-bold
  text-md md:text-xl
  flex
  items-center
  justify-center
  gap-3
  hover:bg-[#0f552c]
  transition
"
                >
                  <Send size={20} />
                  {loading
                    ? "Submitting..."
                    : "Submit Inquiry on InquiryBazaar"}
                </button>


                <a
                  href={`https://wa.me/${details?.user?.phone}`}
                  target="_blank"
                  className="
  mt-4
  flex
  h-[60px]
  w-full
  items-center
  justify-center
  gap-3
  rounded-2xl
  bg-[#25D366]
  text-white
  text-md md:text-xl
  font-bold
"
                >
                  <FaWhatsapp size={22} />
                  Chat directly on WhatsApp
                </a>


                <div className="flex items-center justify-center gap-2 text-gray-600 font-medium">
                  <Clock3 size={16} />
                  <span>Response Within 15 Minutes</span>
                </div>
              </form>
            </div>



          </div>
        </div>
      </section>
    </div>
  );
}