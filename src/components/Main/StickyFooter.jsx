"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    LayoutGrid,
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
            label: "Request Quote",
            icon: FileText,
            center: true,
        },
        {
            href: "/categories",
            label: "Category",
            icon: LayoutGrid,
        },
        {
            href: !user
                ? "/login"
                : user.role === "supplier"
                    ? "https://seller.inquirybazaar.com/dashboard"
                    : "https://buyer.inquirybazaar.com/dashboard",
            label: "Dashboard",
            icon: Layers,
        },
        {
            href: !user
                ? "/login"
                : user.role === "supplier"
                    ? "https://seller.inquirybazaar.com/profile"
                    : "https://buyer.inquirybazaar.com/profile",
            label: "Account",
            icon: User,
        },
    ];

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,.08)]">
                <div className="grid grid-cols-5 h-16">

                    {menus.map((item, index) => {
                        const Icon = item.icon;

                        // Request Quote Button
                        if (item.center) {
                            return (
                                <button
                                    key={index}
                                    onClick={() => setOpenPopup(true)}
                                    className="flex flex-col items-center justify-center gap-1"
                                >
                                    <Icon
                                        size={22}
                                        strokeWidth={2.2}
                                        className={
                                            openPopup
                                                ? "text-[#EC771C]"
                                                : "text-[#082C62]"
                                        }
                                    />

                                    <span
                                        className={`text-[10px] font-medium ${openPopup
                                                ? "text-[#EC771C]"
                                                : "text-[#082C62]"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        }

                        const isExternal =
                            item.href.startsWith("http");

                        const active =
                            !isExternal && pathname === item.href;

                        if (isExternal) {
                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center gap-1"
                                >
                                    <Icon
                                        size={22}
                                        strokeWidth={2.2}
                                        className={
                                            active
                                                ? "text-[#EC771C]"
                                                : "text-[#082C62]"
                                        }
                                    />

                                    <span
                                        className={`text-[10px] font-medium ${active
                                                ? "text-[#EC771C]"
                                                : "text-[#082C62]"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={2.2}
                                    className={
                                        active
                                            ? "text-[#EC771C]"
                                            : "text-[#082C62]"
                                    }
                                />

                                <span
                                    className={`text-[10px] font-medium ${active
                                            ? "text-[#EC771C]"
                                            : "text-[#082C62]"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <HomePopup
                open={openPopup}
                setOpen={setOpenPopup}
            />
        </>
    );
};

export default Stickyfooter;