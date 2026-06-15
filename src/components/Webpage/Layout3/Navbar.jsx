"use client";

import {
  MapPin,
  Phone,
  Send,
  BadgeCheck,
  ShieldCheck,
  CalendarDays,
  
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar({ details }) {
  return (
 <div className="bg-[#f5f5f5] border border-gray-200">
  {/* Company Section */}
  <div className="p-4 flex gap-4">
    
    {/* Logo */}
    <div className="w-[70px] h-[70px] rounded-2xl bg-[#13653A] flex items-center justify-center shrink-0 overflow-hidden">
      <img
              src={details?.user?.profileImage}
              alt={details?.user?.business?.companyName}
              className="w-full h-full object-contain p-2"
            />
    </div>

    <div className="flex-1">
      {/* Company Name */}
      <h1 className="text-[18px] font-bold text-[#2554C7] underline leading-none">
        {details?.user?.business?.companyName ?? "Company Name"}
      </h1>

      {/* Business Type */}
      <p className="text-[13px] text-gray-700 mt-2">
        Trader · Distributor · Importer & Exporter
      </p>

    
        <div className="flex flex-wrap items-center gap-2 ">
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

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          GST Verified
        </span>

        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
          Trusted Seller
        </span>

        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
          ISO Certified
        </span>

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
          Est. 1993
        </span>
      </div>

      {/* Address */}
       <div className="flex items-center gap-1  text-gray-600">
                  <MapPin size={14} />
                  <span className="text-xs md:text-sm">
                    {details?.user?.business?.city}, Delhi India
                  </span>
                </div>
    </div>
  </div>

  {/* Buttons */}
  <div className="border-t bg-white p-3 flex gap-2">
    
    <button className="flex-1 h-[54px] rounded-xl bg-[#13653A] text-white font-semibold flex items-center justify-center gap-2">
      <Send size={18} />
      Send Inquiry
    </button>

    <button className="h-[54px] px-6 rounded-xl border border-[#13653A] text-[#13653A] font-semibold flex items-center gap-2">
      <Phone size={18} />
      Call
    </button>

    <button className="h-[54px] w-[54px] rounded-xl bg-[#25D366] flex items-center justify-center text-white">
      <FaWhatsapp size={22} />
    </button>
  </div>
</div>
  );
}