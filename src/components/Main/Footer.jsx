"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="">
                    <Image
                        src="/Logo/logoo.webp"
                        alt="Promote Bharat"
                        width={200}
                        height={200}
                        className="rounded-xl shadow-lg"
                    />
                </div>

                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition">
                        <FaFacebook size={25} />
                    </Link>

                    <Link href="#" className="hover:text-white transition">
                        <FaInstagram size={25} />
                    </Link>

                    <Link href="#" className="hover:text-white transition">
                        <FaLinkedin size={25} />
                    </Link>
                </div>
            </div>

            <div className="md:flex justify-around border-t border-gray-800 py-6 text-center text-base text-gray-300">
                <p>© Copyright 2026 Inquiry Bazaar Pvt Ltd.</p>

                <p className="mt-1">
                    Developed & Manage by <a href="https://promozionebranding.com" target="_blank" className="text-white hover:underline">Promozione Branding Pvt Ltd.</a>
                </p>
            </div>
        </footer>
    );
}