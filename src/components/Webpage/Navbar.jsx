import { Building2, Factory, Home, Info, Mail, Menu, Phone, ShieldCheck, ShoppingBag, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import Popup from '../Main/Popup';

export default function Navbar({ details, portfolio, navLinks }) {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (<>
        <div className="py-2 text-black lg:block hidden" style={{ backgroundColor: details?.hero?.color }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-20 text-sm">

                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-black" />
                        <span className="font-semibold">
                            GST Verified
                        </span>
                        <span className="opacity-90">
                            ({details?.user?.business?.gstNumber})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Factory size={18} className="text-black" />
                        <span>
                            {details?.user?.business?.businessType}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-black" />
                        <span>{details?.user?.business?.businessField}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-black" />
                        <span>{details?.user?.business?.numberOfEmployees}</span>
                    </div>

                </div>
            </div>
        </div>

        <section className="w-full bg-gray-50 border-b border-b-gray-200 sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 py-2">
                <Link href={`/${portfolio}`} className="border border-gray-200 p-1">
                    <Image
                        width={200}
                        height={200}
                        src={details?.user?.profileImage || "/no-image.webp"}
                        alt="Logo"
                        className="w-auto h-16"
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-6 text-black">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <Link key={index} href={link.href}
                                className="border border-gray-200 flex items-center gap-2 px-4 py-2 rounded-lg text-xl font-semibold bg-white hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <button onClick={() => setOpen(true)} style={{ backgroundColor: details?.hero?.color }} className="flex items-center text-xl font-semibold gap-2 px-5 py-2 rounded-lg text-white">
                        <Phone size={18} />
                        Get in Touch
                    </button>
                </div>

                <button className="lg:hidden bg-orange-400 hover:bg-orange-500 p-3 rounded-lg text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden flex flex-col gap-4 px-4 pb-4 text-black">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <button className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 px-5 py-2 rounded-lg text-white">
                        <Phone size={18} />
                        Get in Touch
                    </button>
                </div>
            )}
        </section>

        <Popup open={open} setOpen={setOpen} details={details} />
    </>)
}
