"use client";

import React from "react";
import { CircleCheckBig, FileText, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Navbar({ details }) {
  return (
    <>
      <div className="w-full bg-white border-b border-gray-300 shadow-sm p-2 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <div className="w-10 h-10 sm:w-24 sm:h-24 shrink-0 border flex items-center justify-center overflow-hidden bg-white">
              <img
                src={details?.user?.profileImage}
                alt={details?.user?.business?.companyName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 break-words">
                  {details?.user?.business?.companyName}
                </h2>

                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="text-yellow-400 text-sm md:text-lg">
                  ★★★★★
                </div>

                <span className="font-semibold text-sm md:text-base text-gray-800">
                  4.8
                </span>

                <span className="text-gray-500 text-xs md:text-sm">
                  (128 Reviews)
                </span>
              </div>

              <div className="flex items-center gap-1  text-gray-600">
                <MapPin size={14} />
                <span className="text-xs md:text-sm">
                  {details?.user?.business?.city}, India
                </span>
              </div>
            </div>
          </div>

          <div className="md:block hidden w-full md:w-auto bg-slate-50 rounded-2xl border border-slate-300 p-4">
            <h3 className="text-center font-bold leading-tight">
              <span className="text-blue-700 text-sm md:text-base">
                INQUIRY BAZAAR
              </span>
              <br />
              <span className="text-green-600 text-sm md:text-base">
                VERIFIED SUPPLIER
              </span>
            </h3>

            <div className="flex items-center justify-center gap-2 mt-3 text-gray-700">
              <CircleCheckBig
                size={18}
                className="text-green-600"
              />
              <span className="text-sm font-medium">
                GST Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed -bottom-1 left-0 right-0 bg-white border-t shadow-lg z-50 lg:hidden">
        <div className="grid grid-cols-3">

          <a
            href={`tel:${details?.user?.phone}`}
            className="flex items-center justify-center gap-2 bg-blue-500 py-4 border-r"
          >
            <Phone size={18} className="text-white" />
            <span className="text-sm font-bold">Call Now</span>
          </a>

          <a
            href="#quote-form"
            className="flex items-center justify-center gap-2 py-4 bg-orange-500 border-r"
          >
            <FileText size={18} className="text-white" />
            <span className="text-sm font-bold">Get Quote</span>
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="flex items-center justify-center gap-2 py-4 bg-green-500 text-white"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-bold">WhatsApp</span>
          </a>

        </div>
      </div>
    </>
  );
}