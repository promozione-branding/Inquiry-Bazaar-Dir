"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X, User, LogOut, Bell, MapPin, ChevronDown, Layers, Search, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { locations } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { initializeLocation, setLocation } from "@/redux/slices/locationSlice";
import { setUser } from "@/redux/slices/userSlice";
import SearchBar from "../Home/Search";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { BsQuestionCircle } from "react-icons/bs";
import HomePopup from "../Home/HomePopup";

export default function Navbar() {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location.city);
    const user = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const profileRef = useRef(null);
    const [bellOpen, setBellOpen] = useState(false);
    const bellRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname()
    const [showSearch, setShowSearch] = useState(true);

    const handleSelect = (city) => {
        const middleName = pathname.split("/")[2];

        if (city.id === "all-india") {
            router.push(`/category/${middleName}`);
        } else {
            router.push(`/category/${middleName}/${city.id}`);
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

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
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
            <div className="w-full bg-[#183B63] hidden md:block text-white">
                <div className="mx-auto flex w-full px-4 xl:px-15  flex-col items-center justify-between gap-3 py-2 text-sm md:flex-row md:gap-0">
                    {/* Left Section */}
                    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-8">
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-white" />
                            <span className="text-gray-100">
                                Have a question? Call us now at{" "}
                                <a href="tel:+917303486777"
                                    className="font-medium hover:text-gray-300"
                                >
                                    +91 7303486777
                                </a>
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-white" />
                            <a href="mailto:care@inquirybazaar.com"
                                className="text-gray-100 hover:text-gray-300"
                            >
                                care@inquirybazaar.com
                            </a>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        Follow Us On
                        <a href="https://www.facebook.com/profile.php?id=61562989183794"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition"
                        >
                            <FaFacebookF size={15} />
                        </a>

                        <a href="https://www.instagram.com/inquirybazaar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition"
                        >
                            <FaInstagram size={18} />
                        </a>

                        <a href="https://www.linkedin.com/company/inquiry-bazaar/?viewAsMember=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition"
                        >
                            <FaLinkedin size={18} />
                        </a>

                        <a href="https://www.youtube.com/@inquirybazaar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition"
                        >

                            <FaYoutube size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto xl:px-6 px-2 flex items-center justify-between py-1">
                <div className="flex md:w-auto w-full gap-2 items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/logocheck.webp"
                            alt="Logo"
                            width={200}
                            height={200}
                            className="object-contain h-12 sm:w-50 w-40"
                        />
                    </Link>
                    <div className="hidden md:flex relative w-full">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EC771C] pointer-events-none" size={18} />

                        <select value={location.id}
                            onChange={(e) => {
                                const city = locations
                                    .flatMap((state) => state.cities)
                                    .find((c) => c.id === e.target.value);

                                dispatch(setLocation(city));

                                if (pathname.startsWith("/category")) {
                                    handleSelect(city);
                                }
                            }}
                            className=" w-full appearance-none rounded-xl border border-orange-300 bg-white py-2.5 pl-10 pr-10
      text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 outline-none hover:border-[#EC771C] focus:border-[#EC771C] focus:ring-1 focus:ring-orange-100 cursor-pointer">

                            {locations.flatMap((state) =>
                                state.cities.map((city) => (
                                    <option key={`${state.state}-${city.id}`}
                                        value={city.id}>
                                        {city.name}
                                    </option>
                                ))
                            )}
                        </select>

                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
                    </div>
                </div>

                <div className="hidden xl:flex items-center gap-2 w-full justify-end">
                    <div className="flex items-center gap- border border-orange-500 rounded-lg ">
                        {/* <AnimatePresence> */}
                        {/* {showSearch && ( */}
                        <motion.div
                            // initial={{ width: 0, opacity: 0, x: 30 }}
                            // animate={{ width: "300px", opacity: 1, x: 0 }}
                            // exit={{ width: 0, opacity: 0, x: 30 }}
                            // transition={{
                            //     duration: 0.35,
                            //     ease: "easeInOut",
                            // }}
                            className=""
                        >
                            <SearchBar showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleFocus={handleFocus} />
                        </motion.div>
                        {/* )} */}
                        {/* </AnimatePresence> */}

                        {/* <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            animate={{ rotate: showSearch ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setShowSearch(!showSearch)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#EC771C] bg-orange-50 text-[#EC771C] hover:bg-[#dc6f1b] hover:text-white transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={showSearch ? "close" : "search"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {!showSearch ? <X size={22} /> : <Search size={22} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button> */}
                    </div>

                    <button onClick={() => setOpenPopup(true)} className="border-2 border-[#082C62] text-[#082C62] px-4 py-2 text-sm font-medium rounded-lg">
                        Request a Quote
                    </button>

                    {user ? (<div className="flex items-center gap-2">
                        {/* <button className="bg-[#f45a06] px-4 py-2 flex flex-col items-center text-xs font-medium rounded-lg">
                            <BsQuestionCircle />
                            Help
                        </button> */}
                        <div ref={profileRef} className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 border rounded-full hover:bg-gray-50 border-gray-200"
                            >
                                <Image
                                    src={user.profileImage || "/profile.png"}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover w-12 h-12"
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
                                            <a href="https://seller.inquirybazaar.com/profile"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <User size={18} className="-mt-0.5" />  Profile
                                            </a>
                                            <a href="https://seller.inquirybazaar.com/dashboard"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <Layers size={18} className="-mt-0.5" />  Dashboard
                                            </a>
                                        </>}
                                        {user.role == "buyer" && <>
                                            <a href="https://buyer.inquirybazaar.com/profile"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <User size={18} className="-mt-0.5" />  Profile
                                            </a>
                                            <a href="https://buyer.inquirybazaar.com/dashboard"
                                                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-black flex gap-2 items-center"
                                            >
                                                <Layers size={18} className="-mt-0.5" />  Dashboard
                                            </a>
                                        </>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>) : (<>
                        <Link href="https://seller.inquirybazaar.com/register" className="px-4 py-2.5 text-sm font-medium border text-white rounded-lg bg-[#EC771C] hover:bg-[#e15306]">
                            Register as Supplier
                        </Link>

                        <Link href="https://buyer.inquirybazaar.com/register" className="px-4 py-2.5 text-sm border font-medium text-white bg-[#082C62] rounded-lg hover:bg-[#062656]">
                            Register as Buyer
                        </Link>

                        <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <LogIn size={18} />
                            Sign In
                        </Link>
                    </>)}
                </div>

                <div className="flex">
                    <button className="xl:hidden bg-blue-600 px-3 py-2 rounded-md mr-2" onClick={() => setSearchOpen(!searchOpen)}>
                        <Search size={20} />
                    </button>

                    <button className="md:hidden bg-[#082C62] px-3 py-2 rounded-md mr-2" onClick={() => setLocationOpen(!locationOpen)}>
                        <MapPin size={20} />
                    </button>
                    {user ?
                        <div className="block xl:hidden relative">
                            <button onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 border rounded-full hover:bg-gray-50 border-gray-200"
                            >
                                <Image
                                    src={user.profileImage || "/profile.png"}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover w-22 h-12"
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
                        </div> :
                        <button className="xl:hidden bg-[#EC771C] px-3 py-2 rounded-md" onClick={() => setOpen(!open)}>
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>}
                </div>
            </div>

            {open && (
                <div className="xl:hidden border-t bg-white absolute w-full">
                    <div className="p-4 space-y-3">

                        <Link href="https://seller.inquirybazaar.com/register" onclick={() => setOpen(false)}
                            className="block w-full text-center py-3 rounded-lg bg-[#EC771C] text-white"
                        >
                            Register as Supplier
                        </Link>

                        <Link href="https://buyer.inquirybazaar.com/register" onclick={() => setOpen(false)}
                            className="block w-full text-center py-3 rounded-lg bg-[#082C62] text-white"
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

            {locationOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Modal Content */}
                    <div className="relative flex justify-center">
                        <button
                            onClick={() => setLocationOpen(false)}
                            className="absolute top-5 right-5 text-white hover:text-black"
                        >
                            <X size={28} />
                        </button>
                        <div className="absolute top-[20vh] bg-wite px-4 pb-4 rounded-lg shadow-lg w-full max-w-xl">

                            {/* Close Button */}

                            <div className="flex relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f45a06] pointer-events-none" size={18} />

                                <select onChange={(e) => { dispatch(setLocation(e.target.value)); (pathname.startsWith("/category") || pathname.startsWith("/search")) && handleSelect(e) }} value={location}
                                    className=" w-full appearance-none rounded-xl border border-orange-300 bg-white py-2.5 pl-10 pr-10
      text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 outline-none hover:border-[#f45a06] focus:border-[#f45a06] focus:ring-1 focus:ring-orange-100 cursor-pointer">
                                    {/* <option value="All India">
                                All India
                            </option> */}

                                    {locations.flatMap((state) =>
                                        state.cities.map((city) => (
                                            <option key={`${state.state}-${city.id}`} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))
                                    )}
                                </select>

                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <HomePopup setOpen={setOpenPopup} open={openPopup} />
        </nav>
    );
}