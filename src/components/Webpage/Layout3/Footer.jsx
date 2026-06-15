"use client";

import Link from "next/link";
import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0E5C3A] text-white rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5">
       
        <div className="flex items-center justify-center gap-2">
          <Store size={20} />

          <h2 className="text-xl font-bold tracking-tight">
            InquiryBazaar
          </h2>

          <span className="bg-orange-500 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            B2B
          </span>
        </div>

    
        <p className="mt-2 text-center text-sm text-green-100">
          India's Hybrid B2B Marketplace • Verified Suppliers • Real Inquiries
        </p>

   
        <div className="w-20 h-px bg-green-300/40 mx-auto my-2"></div>

        
        <nav className="flex flex-wrap justify-center items-center gap-4 text-sm text-green-100">
          <Link
            href="/help-center"
            className="hover:text-white transition-colors"
          >
            Help Center
          </Link>

          <span className="text-green-300">•</span>

          <Link
            href="/about-us"
            className="hover:text-white transition-colors"
          >
            About Us
          </Link>

          <span className="text-green-300">•</span>

          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>

          <span className="text-green-300">•</span>

          <Link
            href="/terms"
            className="hover:text-white transition-colors"
          >
            Terms
          </Link>

          <span className="text-green-300">•</span>

          <Link
            href="/contact-us"
            className="hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </nav>

       
        <p className="mt-2 text-center text-xs text-green-200">
          © {new Date().getFullYear()} InquiryBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}