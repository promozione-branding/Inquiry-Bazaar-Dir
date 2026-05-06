"use client";

import React from "react";
import { MapPin, X, IndianRupee, Briefcase } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className={`fixed lg:relative z-50 top-0 left-0 w-64 bg-white p-4 lg:h-full h-screen
    transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="flex justify-between items-center mb-4 lg:hidden">
                    <h2 className="font-semibold text-[#0A5B93]">Filters</h2>
                    <button className="text-black" onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-gray-700">Location</h3>

                    <div className="relative">
                        <MapPin
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-[#0A5B93]"
                            size={18}
                        />

                        <select className="w-full appearance-none border border-[#0A5B93] text-gray-700 pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A5B93] bg-white shadow-sm">
                            <option>Select Location</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>

                    <div className="relative">
                        <IndianRupee
                            className="absolute left-2 top-3 text-[#0A5B93]"
                            size={18}
                        />

                        <input
                            type="number"
                            placeholder="Min Price"
                            className="w-full border text-black border-[#0A5B93] pl-8 pr-3 py-2 rounded-lg mb-2 focus:outline-none focus:ring-1 focus:ring-[#0A5B93]"
                        />
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="10000"
                        className="w-full accent-[#0A5B93]"
                    />

                    <div className="flex justify-between text-xs mt-1 text-gray-600">
                        <span>₹0</span>
                        <span>₹10000</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-gray-700">
                        Business Type
                    </h3>

                    <div className="space-y-2">
                        {[
                            "Exporter",
                            "Manufacturer",
                            "Retailer",
                            "Wholesaler/Distributor",
                        ].map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 text-sm cursor-pointer text-[#0A5B93]"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-[#0A5B93]"
                                />

                                <Briefcase size={16} className="text-[#0A5B93]" />

                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                <button className="w-full bg-[#0A5B93] text-white py-2 rounded-lg hover:opacity-90 transition">
                    Apply Filters
                </button>
            </div>
        </>
    );
}