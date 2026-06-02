import React from "react";

import SearchBar from "./Search";

export default function HeroSection() {
    return (
        <div className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/home-banner.jpg')" }} />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                    Find Nearby Attractions
                </h1>

                <p className="mt-3 text-white text-lg">
                    Explore top-rated attractions, activities and more
                </p>

                <SearchBar />
            </div>
        </div>
    );
}