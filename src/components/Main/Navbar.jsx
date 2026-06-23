"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X, User, LogOut, Bell, MapPin, ChevronDown, Layers, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { locations } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { initializeLocation, setLocation } from "@/redux/slices/locationSlice";
import { setUser } from "@/redux/slices/userSlice";
import SearchBar from "../Home/Search";

export default function Navbar() {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location.city);
    const user = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const profileRef = useRef(null);
    const [bellOpen, setBellOpen] = useState(false);
    const bellRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname()

    const handleSelect = (e) => {
        const city = e.target.value;
        const middleName = pathname.split("/")[2];
        console.log(middleName); // titanium-dioxide

        if (city) {
            console.log(city)
            router.push(`/category/${middleName}/${encodeURIComponent(city)}`);
        }
    };

    const login = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/dir/me`,
                { withCredentials: true, }
            );

            dispatch(setUser(res.data.user));
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    useEffect(() => {
        login()
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

    useEffect(() => {
        dispatch(initializeLocation());
    }, [dispatch]);

    const [showDropdown, setShowDropdown] = useState(false);
    // console.log(user);

    const handleFocus = () => {
        setShowDropdown(true);


    };

    return (
        <nav className="w-full border-b border-b-gray-300 bg-white sticky top-0 z-50 h-auto relative">
            <div className="mx-auto md:px-6 px-2 flex items-center justify-between">
                <div className="flex md:w-auto w-full gap-5 items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/Logo/logoo.webp"
                            alt="Logo"
                            width={200}
                            height={200}
                            className="object-contain h-20 w-auto"
                        />
                    </Link>
                    <div className="hidden md:flex relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f45a06] pointer-events-none" size={18} />

                        <select onChange={(e) => { dispatch(setLocation(e.target.value)); (pathname.startsWith("/category") || pathname.startsWith("/search")) && handleSelect(e) }} value={location}
                            className=" w-full appearance-none rounded-xl border border-orange-300 bg-white py-2.5 pl-10 pr-10
      text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 outline-none hover:border-[#f45a06] focus:border-[#f45a06] focus:ring-1 focus:ring-orange-100 cursor-pointer">
                            {/* <option value="All India">
                                All India
                            </option> */}

                            {locations.flatMap((state) =>
                                state.cities.map((city) => (
                                    <option key={`${state.state}-${city}`} value={city}>
                                        {city}
                                    </option>
                                ))
                            )}
                        </select>

                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div ref={profileRef} className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 border rounded-full hover:bg-gray-50 border-gray-200"
                            >
                                <Image
                                    src={user.profileImage || "/profile.png"}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover w-15 h-15"
                                />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <div className="flex flex-col justify-center items-center">
                                            <h3 className="font-semibold text-black">
                                                {user.name}
                                            </h3>

                                            <p className="text-sm text-gray-800">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        {user.role == "supplier" && <>
                                            <Link href="https://seller.inquirybazaar.com/profile"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <User size={18} className="-mt-0.5" />  Profile
                                            </Link>
                                            <Link href="https://seller.inquirybazaar.com/dashboard"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <Layers size={18} className="-mt-0.5" />  Dashboard
                                            </Link>
                                        </>}
                                        {user.role == "buyer" && <>
                                            <Link href="https://buyer.inquirybazaar.com/profile"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <User size={18} className="-mt-0.5" />  Profile
                                            </Link>
                                            <Link href="https://buyer.inquirybazaar.com/dashboard"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <Layers size={18} className="-mt-0.5" />  Dashboard
                                            </Link>
                                        </>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="https://seller.inquirybazaar.com/register" className="px-4 py-2.5 text-sm font-medium border text-white rounded-lg bg-[#f45a06] hover:bg-[#eb5505]">
                                Register as Supplier
                            </Link>

                            <Link href="https://buyer.inquirybazaar.com/register" className="px-4 py-2.5 text-sm border font-medium text-white bg-[#1e3a56] rounded-lg hover:bg-[#0b426a]">
                                Register as Buyer
                            </Link>

                            <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <LogIn size={18} />
                                Sign In
                            </Link>
                        </>
                    )}

                </div>

                <button className="md:hidden bg-blue-600 px-3 py-2 rounded-md mr-2" onClick={() => setSearchOpen(!searchOpen)}>
                    <Search size={20} />
                </button>

                <button className="md:hidden bg-[#1e3a56] px-3 py-2 rounded-md mr-2" onClick={() => setLocationOpen(!locationOpen)}>
                    <MapPin size={20} />
                </button>

                <button className="md:hidden bg-[#f45a06] px-3 py-2 rounded-md" onClick={() => setOpen(!open)}>
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t bg-white absolute w-full">
                    <div className="p-4 space-y-3">

                        <Link href="https://seller.inquirybazaar.com/register" onclick={() => setOpen(false)}
                            className="block w-full text-center py-3 rounded-lg bg-[#f45a06] text-white"
                        >
                            Register as Supplier
                        </Link>

                        <Link href="https://buyer.inquirybazaar.com/register" onclick={() => setOpen(false)}
                            className="block w-full text-center py-3 rounded-lg bg-[#1e3a56] text-white"
                        >
                            Register as Buyer
                        </Link>

                        <Link href="/login" onclick={() => setOpen(false)}
                            className="flex justify-center items-center gap-2 py-3 rounded-lg bg-blue-600 text-white"
                        >
                            <LogIn size={18} />
                            Sign In
                        </Link>
                    </div>
                </div>
            )}

            {searchOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Modal Content */}
                    <div className="relative flex justify-center">
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-5 right-5 text-white hover:text-black"
                        >
                            <X size={28} />
                        </button>
                        <div className="absolute top-[20vh] bg-wite px-4 pb-4 rounded-lg shadow-lg w-full max-w-xl">

                            {/* Close Button */}

                            <SearchBar
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                                handleFocus={handleFocus}
                            />
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}