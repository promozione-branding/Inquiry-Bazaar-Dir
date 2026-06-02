"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const itemRefs = useRef([]);

    useEffect(() => {
        if (
            selectedIndex >= 0 &&
            itemRefs.current[selectedIndex]
        ) {
            itemRefs.current[selectedIndex].scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [selectedIndex]);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [query]);

    const handleKeyDown = (e) => {
        if (!searchItems.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < searchItems.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : searchItems.length - 1
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();

            if (selectedIndex >= 0) {
                router.push(`/search/${searchItems[selectedIndex].slug}`);
                setShowDropdown(false);
            }
        }
    };

    const handleFocus = () => {
        setShowDropdown(true);

        window.scrollTo({
            top: 170, // change if needed
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults(null);
                return;
            }

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/search?q=${query}`);
                console.log(res.data.data);
                setResults(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const searchItems = [
        ...(results?.industries || []).map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
        })),
        ...(results?.categories || []).map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
        })),
        ...(results?.products || []).map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
        })),
    ];

    return (
        <div ref={searchRef} className="w-full relative">
            <div className="mt-4 flex items-center bg-white shadow-md rounded-full px-4 py-3">
                <Search
                    className="text-orange-600 mr-2"
                    size={20}
                />

                <input
                    type="text"
                    value={query}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full outline-none text-gray-700 bg-transparent"
                />
            </div>

            {showDropdown && (
                <div className="mt-4 w-full max-h-60 absolute z-10 bg-white rounded-xl shadow-lg border overflow-auto no-scrollbar">
                    {!query ? (
                        <div className="p-4 text-gray-500">
                            Start typing...
                        </div>
                    ) : searchItems.length > 0 ? (
                        searchItems.map((item, index) => (
                            <div key={item.id} ref={(el) => (itemRefs.current[index] = el)}
                                onMouseEnter={() => setSelectedIndex(index)} className={`border-b cursor-pointer text-black ${selectedIndex === index ? "bg-blue-50" : "hover:bg-blue-50"}`}>
                                <Link href={`/search/${item.slug}`} className="px-4! py-2! block">
                                    {item.name}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}