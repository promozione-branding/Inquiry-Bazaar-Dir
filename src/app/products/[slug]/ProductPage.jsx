"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductReviews } from "@/utils/getProductReviews";
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
    SquareArrowOutUpRight, PlayCircle,
    ArrowUpRight
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
    FaPhoneAlt,
    FaWhatsapp,
    FaFilePdf
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { BsTelegram, BsTwitter, BsYoutube } from "react-icons/bs";
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
    const [showYoutube, setShowYoutube] = useState(false);
    const [swiperRef, setSwiperRef] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingType, setLoadingType] = useState(null);

    const [productReviews, setProductReviews] = useState([]);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/product/${slug}`);
                const data = res.data.data.product;
                setProductDetails(data || null);
                setRelatedProducts(res.data.data.relatedProducts.filter((i) => i.supplierId === data?.supplierId));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
    if (!productDetails?._id) return;

    const assignedReviews = getProductReviews(productDetails._id);

    setProductReviews(assignedReviews);
}, [productDetails?._id]);

    useEffect(() => {
    if (productDetails?.media?.length) {
        setActiveIndex(0);
    }
}, [productDetails]);

    useEffect(() => {
        if (productDetails?.media?.length) {
            setActiveIndex(0);
        }
    }, [productDetails]);

    const business = productDetails?.supplier?.business;

    const getInitials = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const trackEvent = async (eventType) => {
        // console.log("Tracking Event:", eventType);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
                {
                    productId: productDetails?.name,
                    supplierToken: productDetails?.supplier?._id,
                    eventType,
                    source: "Dir Product Page",
                }
            );
        } catch (error) {
            console.log("Tracking Error:", error);
        }
    };

    const handleWhatsappClick = async () => {
        if (loadingType) return;

        try {
            setLoadingType("whatsapp");

            await trackEvent("whatsapp_click");

            window.open(business?.social?.whatsapp, "_blank");
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingType(null);
        }
    };

    const handleCallClick = async () => {
        if (loadingType) return;

        try {
            setLoadingType("call");

            await trackEvent("call_click");

            window.location.href = `tel:${productDetails.supplier?.phone}`;
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingType(null);
        }
    };

    const getYoutubeEmbedUrl = (url) => {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    // console.log(productDetails, "details", relatedProducts);

    return (<>
        <Navbar />

        <div className="bg-gray-100 min-h-screen">
            <div className='px-2 md:px-10 pt-4 md:flex hidden items-center text-gray-800 gap-1'>
                <Link href={"/"} className='text-gray-800 font-bold'>
                    Home {" "}
                </Link>
                {productDetails?.categoryId?.slug && (<>
                    <p>/</p>
                    <Link href={`/categories/${productDetails?.categoryId?.slug}`} className='text-gray-800 font-bold'>
                        {productDetails?.categoryId?.name} {" "}
                    </Link>
                </>)}
                {productDetails?.subCategoryId?.slug && (<>
                    <p>/</p>
                    <Link href={`/category/${productDetails?.subCategoryId?.slug}`} className='text-gray-800 font-bold'>
                        {productDetails?.subCategoryId?.name} {" "}
                    </Link>
                </>)}
                <p>/</p>
                <p className='text-gray-600'>
                    {productDetails?.name}
                </p>
            </div>

            <div className="grid grid-cols-1 pt-4 lg:grid-cols-3 gap-4 px-2 md:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-4 rounded-xl shadow-sm h-fit"
                >
                    {showYoutube && productDetails?.youtubeLink ? (
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                            <iframe
                                src={getYoutubeEmbedUrl(productDetails.youtubeLink)}
                                title="YouTube Video"
                                className="w-full h-[360px]"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>)
                        :
                        (<Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 5000 }}
                            loop
                            onSwiper={setSwiperRef}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className="rounded-lg overflow-hidden border border-gray-200"
                        >
                            {productDetails?.media?.filter((img) => img.type === "image").map((img) => (
                                <SwiperSlide key={img._id}>
                                    <img
                                        src={img.url}
                                        className="w-full h-90 object-cover hover:scale-105 transition duration-300"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>)}

                    <div className="flex gap-3 mt-2">
                        {productDetails?.media?.map((media, index) => (
                            <div key={media._id}>
                                {media.type === "image" && (
                                    <img
                                        src={media.url}
                                        onClick={() => {
                                            setShowYoutube(false);
                                            setActiveIndex(index);
                                            swiperRef?.slideToLoop(index);
                                        }}
                                        className={`w-20 h-20 object-contain rounded-lg cursor-pointer border transition-all duration-200 hover:scale-105 ${activeIndex === index
                                            ? "border-orange-500"
                                            : "border-transparent"
                                            }`}
                                        alt=""
                                    />
                                )}

                                {media.type === "video" && (
                                    <a
                                        href={media.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-20 h-20 flex items-center justify-center rounded-lg cursor-pointer border border-orange-500 bg-gray-100 transition-all duration-200 hover:scale-105"
                                    >
                                        <PlayCircle size={20} />
                                    </a>
                                )}

                                {media.type === "pdf" && (
                                    <a
                                        href={media.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-20 h-20 flex flex-col text-[9px] items-center text-[#0A5B93] justify-center rounded-lg cursor-pointer border border-[#0A5B93] bg-gray-100 transition-all duration-200 hover:scale-105"
                                    >
                                        <FaFilePdf size={30} className="mb-1" />
                                        Product Brochure
                                    </a>
                                )}
                            </div>
                        ))}
                        {productDetails?.youtubeLink && (
                            <div onClick={() => setShowYoutube(true)} className="w-20 h-20 flex flex-col text-[9px] text-red-600 items-center justify-center rounded-lg cursor-pointer border border-red-500 bg-gray-100 transition-all duration-200 hover:scale-105">
                                <BsYoutube size={30} className="mb-1" />
                                YouTube Video
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-2xl shadow-md"
                >
                    <div className="mb-2">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {productDetails?.name}
                        </h1>
                        <p className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                            <Tag size={15} />
                            Brand:{" "}
                            <span className="text-[#0A5B93] font-medium">
                                {productDetails?.brandName}
                            </span>
                        </p>
                    </div>

                    <div className="bg-[#F8FAFC] border rounded-xl mb-2 flex items-center justify-between">
                        <div className="flex items-center text-gray-800">
                            <IndianRupee size={16} className="mt-1" />
                            <span className="text-3xl font-bold">
                                {productDetails?.price}/
                            </span>
                            <span className="text-sm text-gray-600 mt-2"> Box</span>
                        </div>

                        <div className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full">
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

                    <button onClick={(e) => { e.preventDefault(); setOpenPopup(true); setPopupProduct(productDetails) }} className="w-full bg-linear-to-r from-[#0A5B93] to-[#084b7b] text-white py-3 rounded-xl font-medium transition hover:opacity-90 hover:shadow-md">
                        Send Inquiry
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-md p-4 h-fit"
                >
                    <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-bold text-[#0A5B93]">
                            {productDetails?.supplier?.profileImage ? (
                                <img
                                    src={productDetails.supplier?.profileImage}
                                    alt="supplier"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                getInitials(business?.companyName)
                            )}
                        </div>

                        <div className="flex-1">
                            {productDetails?.supplier?.webpage?.slug ?
                                <Link href={`/${productDetails.supplier.webpage.slug}`} className="hover:underline text-md font-semibold text-gray-800 flex items-center gap-1 cursor-pointer group hover:text-orange-500 transition">
                                    {business?.companyName}
                                    <SquareArrowOutUpRight size={16} className="text-gray-800 group-hover:text-orange-500 transition" />
                                </Link>
                                :
                                <p className="font-semibold text-lg text-gray-800 leading-tight">
                                    {business?.companyName}
                                </p>}

                            <div className="flex items-center gap-1 text-sm text-gray-800">
                                <MapPin size={14} className="-mt-0.5" />
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
                        <button onClick={handleCallClick} disabled={loadingType !== null}
                            className={`w-full border bg-blue-50 border-[#0A5B93] text-[#0A5B93] py-2 rounded-lg flex items-center justify-center gap-2 transition
                            ${loadingType === "call" ? "opacity-50 cursor-not-allowed" : "hover:text-white hover:bg-[#0A5B93]"}`}>
                            <Phone size={20} />
                            {loadingType === "call" ? "Please wait..." : "Call Now"}
                        </button>

                        <button onClick={handleWhatsappClick} disabled={loadingType !== null}
                            className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition border border-green-500 hover:bg-green-600 hover:text-white
                            ${loadingType === "whatsapp" ? "opacity-50 cursor-not-allowed bg-green-50 text-green-500" : "bg-green-50 text-green-700 hover:opacity-90"}`}>
                            <FaWhatsapp size={25} />
                            {loadingType === "whatsapp" ? "Opening..." : "Contact Supplier"}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">
                                    {productDetails.supplier?.phone || "-"}
                                </p>
                            </div>
                        </div>

                        <div title={productDetails.supplier?.email} className="flex items-start gap-2 overflow-hidden">
                            <FaEnvelope className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-800 wrap-break-word">
                                    {productDetails.supplier?.email && productDetails.supplier?.email.length > 26
                                        ? productDetails.supplier?.email.slice(0, 26) + "..."
                                        : productDetails.supplier?.email || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Alt Number</p>
                                <p className="font-medium text-gray-800">
                                    {productDetails.supplier?.otherPhone || "-"}
                                </p>
                            </div>
                        </div>

                        <div title={productDetails.supplier?.otherEmail} className="flex items-start gap-2 overflow-hidden">
                            <FaEnvelope className="text-[#0A5B93] mt-1" size={14} />
                            <div>
                                <p className="text-gray-500">Alt Email</p>
                                <p className="font-medium text-gray-800 wrap-break-word">
                                    {productDetails.supplier?.otherEmail && productDetails.supplier?.otherEmail.length > 26
                                        ? productDetails.supplier?.otherEmail.slice(0, 26) + "..."
                                        : productDetails.supplier?.otherEmail || "-"}
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
                        <div className="flex gap-8 justify-center">
                            {business?.social?.linkedin && (
                                <a
                                    href={business?.social?.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin size={25} className="text-blue-700" />
                                </a>
                            )}

                            {business?.social?.instagram && (
                                <a
                                    href={business?.social?.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Instagram"
                                >
                                    <FaInstagram size={25} className="text-pink-600" />
                                </a>
                            )}

                            {business?.social?.facebook && (
                                <a
                                    href={business?.social?.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Facebook"
                                >
                                    <FaFacebook size={25} className="text-blue-600" />
                                </a>
                            )}

                            {business?.social?.youtube && (
                                <a
                                    href={business?.social?.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="YouTube"
                                >
                                    <FaYoutube size={25} className="text-red-600" />
                                </a>
                            )}

                            {business?.social?.telegram && (
                                <a
                                    href={business?.social?.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Telegram"
                                >
                                    <BsTelegram size={25} className="text-blue-600" />
                                </a>
                            )}

                            {business?.social?.twitter && (
                                <a
                                    href={business?.social?.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Twitter"
                                >
                                    <FaXTwitter size={25} className="text-black" />
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
                                ? "text-orange-500 border-b-2 border-orange-500"
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

            <RatingsUI productReviews={productReviews} />

            {relatedProducts.length != 0 &&
                <div className="my-5 px-4 md:px-10">
                    <div className="bg-white rounded-xl md:p-8 px-2 py-4 shadow-md border text-black border-gray-200">
                        <h2 className="text-2xl md:text-start text-center font-bold text-slate-900 mb-6">
                            Related Products
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2">
                            {relatedProducts?.slice(0, 4)?.map((item) => {
                                const discount = item?.oldPrice > item?.price ?
                                    Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : 0;

                                return (
                                    <Link href={""} key={item?._id}
                                        className="group bg-white rounded-2xl border shadow-md border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative bg-slate-50 md:h-70 overflow-hidden">
                                            <img
                                                src={item?.media?.[0]?.url || "/placeholder-product.jpg"}
                                                alt={item?.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />

                                            {discount > 0 && (
                                                <span className="absolute md:top-2 top-1 md:right-2 right-1 bg-red-500 text-white md:text-xs text-[10px] font-semibold md:px-3 px-1 py-1 rounded-full">
                                                    {discount}% OFF
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="md:px-4 px-2 py-2">
                                            {/* Product Name */}
                                            <h3 className="font-semibold md:text-base text-xs text-gray-900 line-clamp-1">
                                                {item?.name}
                                            </h3>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mt-">
                                                <span className="md:text-2xl text-xs font-bold text-orange-600">
                                                    ₹{item?.price}
                                                </span>

                                                {item?.oldPrice > item?.price && (
                                                    <span className="md:text-sm text-xs text-gray-400 line-through">
                                                        ₹{item?.oldPrice}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Bottom */}
                                            <div className="flex items-center justify-between mt-">
                                                <span className="md:text-sm text-xs font-semibold text-gray-700 group-hover:text-orange-600 transition">
                                                    View Product
                                                </span>

                                                <div
                                                    className="
                                                                       md:w-10 md:h-10 w-5 h-5
                                                                       rounded-full
                                                                       bg-orange-100
                                                                       text-orange-500
                                                                       flex items-center justify-center
                                                                       transition-all duration-300
                                                                       group-hover:bg-orange-500
                                                                       group-hover:text-white
                                                                       group-hover:rotate-45
                                                                   "
                                                >
                                                    <ArrowUpRight className='md:w-5 md:h-5 w-3 h-3' />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>}
        </div>

        <Footer />
        <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
    </>);
}