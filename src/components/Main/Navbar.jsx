"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X, User, LogOut, Bell, MapPin, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const profileRef = useRef(null);
    const [bellOpen, setBellOpen] = useState(false);
    const bellRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setBellOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="w-full border-b border-b-gray-300 bg-white sticky top-0 z-50 h-auto relative">
            <div className="mx-auto md:px-6 px-2 flex items-center justify-between">
                <div className="flex md:w-auto w-full gap-5 items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/Logo/logoo.webp"
                            alt=""
                            width={200}
                            height={200}
                            className="object-contain h-20 w-auto"
                        />
                    </Link>
                    <div className="hidden md:flex relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f45a06] pointer-events-none" size={18} />

                        <select defaultValue=""
                            className=" w-full appearance-none rounded-xl border border-orange-300 bg-white py-2.5 pl-10 pr-10
      text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 outline-none hover:border-[#f45a06] focus:border-[#f45a06] focus:ring-1 focus:ring-orange-100 cursor-pointer">
                            <option value="" disabled>
                                Select Location
                            </option>

                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Chennai">Chennai</option>
                        </select>

                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="https://promote-bharat.vercel.app/register/supplier" className="px-4 py-2.5 text-sm font-medium border text-white rounded-lg bg-[#f45a06] hover:bg-[#eb5505]">
                        Register as Supplier
                    </Link>

                    <Link href="https://promote-bharat.vercel.app/register/buyer" className="px-4 py-2.5 text-sm border font-medium text-white bg-[#1e3a56] rounded-lg hover:bg-[#0b426a]">
                        Register as Buyer
                    </Link>

                    <Link href="https://promote-bharat.vercel.app/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <LogIn size={18} />
                        Sign In
                    </Link>
                </div>

                <button className="md:hidden bg-[#1e3a56] px-3 py-2 rounded-md mr-2" onClick={() => setLocationOpen(!locationOpen)}>
                    <MapPin size={25} />
                </button>

                <button className="md:hidden bg-[#f45a06] px-3 py-2 rounded-md" onClick={() => setOpen(!open)}>
                    {open ? <X size={25} /> : <Menu size={25} />}
                </button>

            </div>

            {/* {locationOpen && (
                <div className="md:hidden px-3 pb-3">
                    <select className="w-full rounded-xl border border-orange-300 py-3 px-3">
                        <option>Select Location</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                    </select>
                </div>
            )} */}

            {open && (
                <div className="md:hidden border-t bg-white absolute w-full">
                    <div className="p-4 space-y-3">

                        <Link
                            href="/register/supplier"
                            className="block w-full text-center py-3 rounded-lg bg-[#f45a06] text-white"
                        >
                            Register as Supplier
                        </Link>

                        <Link
                            href="/register/buyer"
                            className="block w-full text-center py-3 rounded-lg bg-[#1e3a56] text-white"
                        >
                            Register as Buyer
                        </Link>

                        <Link
                            href="/login"
                            className="flex justify-center items-center gap-2 py-3 rounded-lg bg-blue-600 text-white"
                        >
                            <LogIn size={18} />
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}