"use client";
import React, { useEffect, useState } from "react";
import {
    FaShieldAlt,
    FaCheckCircle,
    FaLock,
    FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { motion } from "framer-motion";

const items = [
    {
        icon: <FaShieldAlt className="text-green-600" />,
        text: "Verified Suppliers",
    },
    {
        icon: <FaLock className="text-green-500" />,
        text: "Secure Inquiries",
    },
    {
        icon: <FaPhoneAlt className="text-blue-500" />,
        text: "Direct Contact",
    },
    {
        icon: <MdOutlinePayments className="text-blue-600" />,
        text: "No Hidden Charges",
    },
    {
        icon: <FaCheckCircle className="text-blue-700" />,
        text: "Buyer Protection",
    },
];
export default function MarqueeSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");

        const update = () => {
            setIsMobile(media.matches);
        };

        update();

        media.addEventListener("change", update);

        return () => {
            media.removeEventListener("change", update);
        };
    }, []);

    return (
        <div className="w-full overflow-hidden bg-white border-b">
            <motion.div
                className="flex whitespace-nowrap w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: isMobile ? 5 : 18, // faster on mobile
                    ease: "linear",
                }}
            >
                {[...items, ...items].map((item, index) => (
                    <div key={index}
                        className="flex items-center gap-10 px-5 py-3 shrink-0"
                    >
                        {index === 0 && (
                            <>
                                <span className="font-semibold text-gray-700">
                                    Your Business is Protected with Inquiry Bazaar
                                </span>

                                {/* <img
                                    src="/Business Syndicate (21).png"
                                    alt="Inquiry Bazaar"
                                    className='w-50 h-10 object-cover scale-100'
                                    style={{ objectPosition: "50% 53%" }}
                                /> */}
                            </>
                        )}

                        <div className="flex items-center gap-2 font-semibold text- text-gray-700">
                            <span className="text-xl">{item.icon}</span>
                            {item.text}
                        </div>

                        {index === 9 && (
                            <>
                                <img
                                    src="/Business Syndicate (21).png"
                                    alt="Inquiry Bazaar"
                                    className='w-50 h-10 object-cover scale-100'
                                    style={{ objectPosition: "50% 53%" }}
                                />
                            </>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}