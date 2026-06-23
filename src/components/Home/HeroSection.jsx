"use client"
import React, { useState } from "react";
import SearchBar from "./Search";

export default function HeroSection() {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleFocus = () => {
        setShowDropdown(true);

        window.scrollTo({
            top: 350, // change if needed
            behavior: "smooth",
        });
    };
    return (
        <section className="relative w-full h-[72vh] overflow">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/banner.webp')",
                }}
            />

            {/* Dark overlay like first screenshot */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#051a3b]/80 via-[#051a3b]/05 to-transparent" /> */}

            {/* Content */}
            <div className="relative z-10 h-full flex items-end">
                <div className="max-w- mx-auto w-full px-6 lg:px-16 pb-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-white font-bold leading-tight">
                            <span className="block text-4xl md:text-6xl">
                                India’s Smart
                            </span>

                            <div className="flex lg:flex-row flex-col gap-4.5 text-orange-500 text-5xl md:text-7xl whitespace-nowrap">
                                Industrial B2B
                                <span className="text-white">
                                    Marketplace
                                </span>
                            </div>


                        </h1>

                        <p className="mt-2 text-lg text-white/90 max-w-3xl">
                            Find verified manufacturers, suppliers,
                            wholesalers, and service providers across India.
                        </p>

                        {/* Search */}
                        <div className="mt-2 max-w-2xl">
                            <SearchBar handleFocus={handleFocus} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}