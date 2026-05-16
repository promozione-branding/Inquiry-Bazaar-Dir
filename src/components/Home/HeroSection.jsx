import React from "react";
import { Search } from "lucide-react";

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

                <div className="mt-6 flex items-center bg-white shadow-md rounded-full px-4 py-3">
                    <Search className="text-orange-600 mr-2" size={20} />
                    <input
                        type="text"
                        placeholder="Search product here..."
                        className="w-full outline-none text-gray-700 bg-transparent"
                    />
                </div>
            </div>
        </div>
    );
}