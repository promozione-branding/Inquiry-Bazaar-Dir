"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    LayoutGrid,
    Search,
    User,
    FileText,
    Layers,
} from "lucide-react";
import { useState } from "react";
import HomePopup from "../Home/HomePopup";
import { useSelector } from "react-redux";

const Stickyfooter = () => {
    const pathname = usePathname();
    const [openPopup, setOpenPopup] = useState(false);
    const user = useSelector((state) => state.user.user);

    const menus = [
        {
            href: "/",
            label: "Home",
            icon: House,
        },
        {
            href: "/products",
            label: "Quote",
            icon: FileText,
            center: true,
        },
        {
            href: "/categories",
            label: "Category",
            icon: LayoutGrid,
        },
        {
            href: `${!user ? "/login" : user.role == "supplier" ? "https://seller.inquirybazaar.com/dashboard" : "https://buyer.inquirybazaar.com/dashboard"}`,
            label: "Dashboard",
            icon: Layers,
        },
        {
            href: `${!user ? "/login" : user.role == "supplier" ? "https://seller.inquirybazaar.com/profile" : "https://buyer.inquirybazaar.com/profile"}`,
            label: "Account",
            icon: User,
        },
    ];

    return (
        <>
            <div className="fixed -bottom-0.5 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,.08)]">
                <div className="grid grid-cols-5 gap-2 h-16">

                    {menus.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return item.center ? (
                            <button key={item.href} onClick={() => setOpenPopup(true)}
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={2.2}
                                    className={active ? "text-[#EC771C]" : "text-[#082C62]"}
                                />

                                <span className={`text-[10px] font-medium ${active ? "text-[#EC771C]" : "text-[#082C62]"}`}>
                                    Request Quote
                                </span>
                            </button>
                        ) : (
                            <Link key={item.href} href={item.href}
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={2.2}
                                    className={active ? "text-[#EC771C]" : "text-[#082C62]"}
                                />

                                <span className={`text-[10px] font-medium ${active ? "text-[#EC771C]" : "text-[#082C62]"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <HomePopup open={openPopup} setOpen={setOpenPopup} />
        </>
    );
};

export default Stickyfooter;