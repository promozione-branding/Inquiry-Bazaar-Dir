"use client";
import React, { useState } from 'react'
import { CircleCheckBig, FileText, MapPin, MessageCircle, Phone } from "lucide-react";
import axios from 'axios';
import Link from 'next/link';

export default function Navbar2({ details, portfolio }) {
  const [loadingType, setLoadingType] = useState(null);

  const trackEvent = async (eventType, productDetails) => {
    // console.log("Tracking Event:", eventType);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
        {
          productId: "N/A",
          supplierToken: productDetails?.user?._id,
          eventType,
          source: "Dir Web Page",
        }
      );
    } catch (error) {
      console.log("Tracking Error:", error);
    }
  };

  const handleWhatsappClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("whatsapp");

      await trackEvent("whatsapp_click", product);

      window.open(
        link,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  const handleCallClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("call");

      await trackEvent("call_click", product);

      window.location.href = `tel:${link}`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <>
      <div className="w-full bg-white border-b border-gray-300 shadow-sm p-2 sticky top-0 z-50">
        <div className="flex items-center justify-between md:gap-5 gap-2">
          <Link href={`/${portfolio}`} className="flex items-center gap-1 md:gap-5 min-w-0">
            <div className="w-12 h-12 sm:w-24 sm:h-24 shrink-0 border flex items-center justify-center overflow-hidden bg-white">
              <img
                src={details?.user?.profileImage}
                alt={details?.user?.business?.companyName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-slate-900 break-words">
                  {details?.user?.business?.companyName}
                </h2>

                <div className="md:w-6 md:h-6 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
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

                <span className="font-semibold text-xs md:text-base text-gray-800">
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
          </Link>

          <div className="w-auto bg-slate-50 rounded-md md:rounded-2xl border border-slate-300 md:p-4 p-1">
            <h3 className="text-center md:font-bold leading-tight">
              <span className="text-blue-700 text-xs md:text-base">
                INQUIRY BAZAAR
              </span>
              <br />
              <span className="text-green-600 text-xs md:text-base">
                VERIFIED SUPPLIER
              </span>
            </h3>

            <div className="hidden md:flex items-center justify-center gap-2 mt-3 text-gray-700">
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

          <button onClick={() => handleCallClick(details, details?.user?.phone)} disabled={loadingType !== null}
            className="flex items-center justify-center gap-2 bg-blue-500 py-4 border-r"
          >
            <Phone size={18} className="text-white" />
            <span className="text-sm font-bold">Call Now</span>
          </button>

          <a href="#quote-form"
            className="flex items-center justify-center gap-2 py-4 bg-orange-500 border-r"
          >
            <FileText size={18} className="text-white" />
            <span className="text-sm font-bold">Get Quote</span>
          </a>

          <button onClick={() => handleWhatsappClick(details, details?.user?.business?.social?.whatsapp)} disabled={loadingType !== null}
            className="flex items-center justify-center gap-2 py-4 bg-green-500 text-white"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-bold">WhatsApp</span>
          </button>

        </div>
      </div>
    </>
  );
}