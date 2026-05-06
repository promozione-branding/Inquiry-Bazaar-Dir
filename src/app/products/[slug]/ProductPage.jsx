"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Package,
    IndianRupee,
    Layers,
    FileText,
    Tag,
    Truck,
    CreditCard,
    Star,
    BadgeCheck,
    Store,
} from "lucide-react";
import {
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaBuilding,
    FaUsers,
    FaIndustry,
    FaPhoneAlt
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { BsTelegram, BsTwitter } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import ContactModal from "@/components/Main/ContactModal";
import Image from "next/image";
import RatingsUI from "@/components/Product/ReviewSection";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ProductPage() {
    const { slug } = useParams()
    const [tab, setTab] = useState("specs");
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [webpage, setWebpage] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/product/${slug}`);
                const data = res.data.data;
                setProductDetails(data || null);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        if (productDetails?.media?.length) {
            setActiveIndex(0);
        }

        if (productDetails == {}) return;
        const fetchData = async () => {
            try {
                const res1 = await axios.get(`/api/category/${productDetails?.subCategoryId?.slug}`);
                const res2 = await axios.get(`/api/webpage/${productDetails?.supplierId?._id}`);
                setWebpage(res2.data)
                const data1 = res1.data?.data.products.filter((i) => i._id != productDetails._id);
                setRelatedProducts(data1 || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [productDetails]);

    const business = productDetails.supplierId?.business;

    const getInitials = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (<>
        <Navbar />

        <div className="bg-gray-100 min-h-screen">
            <div className='px-4 md:px-10 pt-4 md:flex hidden items-center text-gray-800 gap-1'>
                <Link href={"/"} className='text-gray-800 font-bold'>
                    Home {" "}
                </Link>
                <p>/</p>
                <Link href={`/categories/${productDetails?.categoryId?.slug}`} className='text-gray-800 font-bold'>
                    {productDetails?.categoryId?.name} {" "}
                </Link>
                <p>/</p>
                <Link href={`/category/${productDetails?.subCategoryId?.slug}`} className='text-gray-800 font-bold'>
                    {productDetails?.subCategoryId?.name} {" "}
                </Link>
                <p>/</p>
                <p className='text-gray-600'>
                    {productDetails?.name}
                </p>
            </div>

            <div className="grid grid-cols-1 pt-4 lg:grid-cols-3 gap-4 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-4 rounded-xl shadow-sm h-fit"
                >
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 5000 }}
                        loop
                        onSwiper={setSwiperRef}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="rounded-lg overflow-hidden border border-gray-200"
                    >
                        {productDetails?.media?.map((img) => (
                            <SwiperSlide key={img._id}>
                                <img
                                    src={img.url}
                                    className="w-full h-90 object-contain hover:scale-105 transition duration-300"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex gap-3 mt-2">
                        {productDetails?.media?.map((img, index) => (
                            <img
                                key={img._id}
                                src={img.url}
                                onClick={() => {
                                    setActiveIndex(index);
                                    swiperRef?.slideToLoop(index); // 🔥 sync with swiper
                                }}
                                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border transition-all duration-200 hover:scale-105 ${activeIndex === index
                                    ? "border-[#0A5B93]"
                                    : "border-transparent"
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-2xl shadow-md"
                >
                    <div className="mb-2">
                        <h1 className="text-2xl font-semibold text-[#0A5B93]">
                            {productDetails?.name}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Tag size={15} />
                            Brand:{" "}
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.brandName}
                            </span>
                        </p>
                    </div>

                    <div className="bg-[#F8FAFC] border rounded-xl mb-2 flex items-center justify-between">
                        <div className="flex items-center text-[#D01132]">
                            <IndianRupee size={16} className="mt-1" />
                            <span className="text-3xl font-bold">
                                {productDetails?.price}/
                            </span>
                            <span className="text-sm text-gray-600 mt-2"> Box</span>
                        </div>

                        <div className="text-xs bg-[#0A5B93] text-white px-3 py-1 rounded-full">
                            {productDetails?.priceType}
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <Layers size={14} /> Category
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.categoryId?.name}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <Layers size={14} /> Sub Category
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.subCategoryId?.name}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <IndianRupee size={14} /> Price Type
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.priceType}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <Package size={14} /> MOQ
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.minOrderQty}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <Truck size={14} /> Delivery Time
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.deliveryTime}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <CreditCard size={14} /> Payment Terms
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.paymentTerms}
                            </span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="flex items-center gap-2">
                                <Package size={14} /> Packaging
                            </span>
                            <span className="text-[#0A5B93] font-medium text-right max-w-[60%] wrap-break-word">
                                {productDetails?.packagingDetails}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                                <Layers size={14} /> Supply Ability
                            </span>
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.supplyAbility || "-"}
                            </span>
                        </div>

                    </div>

                    <button onClick={(e) => { e.preventDefault(); setOpenPopup(true); setPopupProduct(productDetails) }} className="w-full bg-linear-to-r from-[#D01132] to-[#b50e2b] text-white py-3 rounded-xl font-medium transition hover:opacity-90 hover:shadow-md">
                        Send Inquiry
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-md p-4 h-fit"
                >
                    <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-[#0A5B93]">
                            {getInitials(business?.companyName)}
                        </div>

                        <div className="flex-1">
                            {webpage?.slug ?
                                <Link href={`/${webpage.slug}`} className="hover:text-blue-500 hover:underline font-semibold text-lg text-gray-800 leading-tight">
                                    {business?.companyName}
                                </Link>
                                :
                                <p className="font-semibold text-lg text-gray-800 leading-tight">
                                    {business?.companyName}
                                </p>}

                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPin size={14} />
                                {business?.address}
                            </div>

                            {/* GST + TRUST */}
                            <div className="flex items-center gap-2 mt-1 text-sm">
                                <span className="text-gray-600">
                                    GST: {business?.gstNumber || "N/A"}
                                </span>

                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                    <BadgeCheck size={14} />
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} className="text-gray-300" />
                            <span className="text-gray-600 ml-1">4.4 <span className="text-blue-500 underline">(20)</span></span>
                        </div>

                        <span className="text-gray-600">
                            Est. {new Date(business?.establishedDate).getFullYear()}
                        </span>
                    </div>

                    <div className="space-y-2 mt-2">
                        <button className="w-full border border-[#0A5B93] text-[#0A5B93] py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0A5B93]/5">
                            <Phone size={16} />
                            Call Now
                        </button>

                        <button className="w-full bg-[#0A5B93] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90">
                            <Mail size={16} />
                            Contact Supplier
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">
                                    {productDetails.supplierId?.phone || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaEnvelope className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-800 wrap-break-word">
                                    {productDetails.supplierId?.email1 || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Alt Number</p>
                                <p className="font-medium text-gray-800">
                                    {productDetails.supplierId?.otherPhone || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaEnvelope className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Alt Email</p>
                                <p className="font-medium text-gray-800 wrap-break-word">
                                    {productDetails.supplierId?.otherEmail || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaIndustry className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Business Type</p>
                                <p className="font-medium text-gray-800">
                                    {business?.businessType || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaBuilding className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Ownership</p>
                                <p className="font-medium text-gray-800">
                                    {business?.ownershipType || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaUsers className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Employees</p>
                                <p className="font-medium text-gray-800">
                                    {business?.numberOfEmployees || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaIndustry className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Turnover</p>
                                <p className="font-medium text-gray-800">
                                    {business?.annualTurnover || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-t-gray-200 pt-3 mt-3">
                        <div className="flex gap-5 justify-center">
                            {business?.social?.linkedin && (
                                <a
                                    href={business.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="LinkedIn"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                >
                                    <FaLinkedin size={18} className="text-blue-700" />
                                </a>
                            )}

                            {business?.social?.instagram && (
                                <a
                                    href={business.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Instagram"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-pink-100 transition hover:scale-105"
                                >
                                    <FaInstagram size={18} className="text-pink-600" />
                                </a>
                            )}

                            {business?.social?.facebook && (
                                <a
                                    href={business.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Facebook"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                >
                                    <FaFacebook size={18} className="text-blue-600" />
                                </a>
                            )}

                            {business?.social?.youtube && (
                                <a
                                    href={business.social.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="YouTube"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition hover:scale-105"
                                >
                                    <FaYoutube size={18} className="text-red-600" />
                                </a>
                            )}

                            {business?.social?.telegram && (
                                <a
                                    href={business.social.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Telegram"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                                >
                                    <BsTelegram size={18} className="text-blue-600" />
                                </a>
                            )}

                            {business?.social?.twitter && (
                                <a
                                    href={business.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Twitter"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                                >
                                    <FaXTwitter size={18} className="text-black" />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="px-4 md:px-10 mt-5">
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="flex border-b">
                        <button
                            onClick={() => setTab("specs")}
                            className={`flex items-center gap-2 px-6 py-3 font-medium ${tab === "specs"
                                ? "text-[#D01132] border-b-2 border-[#D01132]"
                                : "text-gray-500"
                                }`}
                        >
                            <Layers size={16} /> Specifications
                        </button>

                        <button
                            onClick={() => setTab("desc")}
                            className={`flex items-center gap-2 px-6 py-3 font-medium ${tab === "desc"
                                ? "text-[#0A5B93] border-b-2 border-[#0A5B93]"
                                : "text-gray-500"
                                }`}
                        >
                            <FileText size={16} /> Description
                        </button>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="p-5">
                        {tab === "specs" && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {productDetails?.specifications?.map((spec) => (
                                    <motion.div
                                        key={spec._id}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex justify-between p-3 border rounded-lg border-gray-300"
                                    >
                                        <span className="text-gray-600">{spec.key}</span>
                                        <span className="font-medium text-[#0A5B93]">{spec.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {tab === "desc" && (
                            <div
                                className="prose max-w-none text-black border border-gray-300 p-3 rounded-lg"
                                dangerouslySetInnerHTML={{
                                    __html: productDetails?.description,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <RatingsUI />

            <div className="py-8 px-4 md:px-10">
                <h2 className="text-3xl text-[#0A5B93] font-bold mb-5">Related Products</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {relatedProducts.map((i, idx) => (
                        <Link href={`/products/${i.slug}`} key={idx}
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-200"
                        >
                            <div className="w-full h-40 relative mb-2">
                                <Image
                                    src={i.media?.[0]?.url || "/noimage.png"}
                                    alt={i.name}
                                    fill
                                    className="object-contain group-hover:scale-105 transition"
                                />
                            </div>

                            <p className="text-gray-800 font-semibold line-clamp-2 group-hover:text-[#0A5B93] transition">
                                {i.name}
                            </p>

                            <div className='flex items-center justify-between mt-1'>
                                {i.brandName && (
                                    <div className="flex bg-[#0A5B93] items-center gap-1 text-xs text-white px-2 py-1 rounded-xl">
                                        <Tag size={14} className="text-white" />
                                        <span>{i.brandName}</span>
                                    </div>
                                )}

                                <div className="flex items-center text-sm font-semibold text-gray-800 justify-center">
                                    <IndianRupee size={14} className="text-[#0A5B93] -mt-0.5" />
                                    {i.price ? i.price : "On Request"}
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-1'>
                                {i.supplierId?.name && (
                                    <div className="flex items-center gap-1 text-gray-800">
                                        <Store size={14} className="text-[#0A5B93]" />
                                        <span>{i.supplierId.name}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-1 text-gray-800">
                                    <MapPin size={14} className="text-[#0A5B93]" />
                                    <span>Delhi</span>
                                </div>
                            </div>

                            <button onClick={(e) => { e.preventDefault(); setOpenPopup(true); setPopupProduct(i) }}
                                className='cursor-pointer w-full py-2 rounded-lg bg-[#0A5B93] mt-2'>
                                Contact Supplier
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        <Footer />
        <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
    </>);
}