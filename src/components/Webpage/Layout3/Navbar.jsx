"use client";
import { MapPin, } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar3({ details, portfolio }) {
  return (
    <div className="bg-white border border-gray-300 sticky top-0 z-50">
      {/* Company Section */}
      <div className="md:p-4 p-2 flex md:flex-row flex-col justify-between md:gap-4 ">
        <Link href={`/${portfolio}`} className="flex gap-2">
          {/* Logo */}
          <div style={{ backgroundColor: details?.hero?.color }} className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={details?.user?.profileImage}
              alt={details?.user?.business?.companyName}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-2">
            <h1 style={{ color: details?.hero?.color }} className="text-[18px] font-bold underline leading-none">
              {details?.user?.business?.companyName ?? "Company Name"}
            </h1>

            <p className="text-xs font-medium text-gray-800 mt-1">
              ● Distributor ● Supplier ● Manufacturer
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-yellow-400 text-sm">
                ★★★★★
              </div>

              <span className="font-semibold text-xs text-gray-800">
                4.8
              </span>

              <span className="text-gray-500 text-xs">
                (128 Reviews)
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-800">
              <MapPin size={14} className="-mt-1" />
              <span className="text-xs md:text-sm">
                {details?.user?.business?.city}, India
              </span>
            </div>
          </div>
        </Link>

        <div className="flex gap-2 mt-3 items-center justify-center">
          <span className="p-2 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            GST Verified
          </span>

          <span className="p-2 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
            Trusted Seller
          </span>

          <span className="p-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
            Est. 1988
          </span>
        </div>
      </div>
    </div>
  );
}