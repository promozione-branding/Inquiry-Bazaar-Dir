"use client"
import Footer from '@/components/Webpage/Footer';
import Navbar from '@/components/Webpage/Navbar';
import axios from 'axios';
import { Home, Info, Mail, PhoneCall, ShoppingBag } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import ContactModal from '@/components/Main/ContactModal';
import { BsWhatsapp } from 'react-icons/bs';

export default function Product() {
    const router = useRouter();
    const { portfolio } = useParams()
    const { slug } = useParams()
    const [product, setProduct] = useState({});
    const [details, setDetails] = useState(null)
    const [loadingPage, setLoadingPage] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [showYoutube, setShowYoutube] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupProduct, setPopupProduct] = useState({});

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/product/${slug}`);
                // console.log(res.data, "product details");
                const data = res.data.data.product;
                setProduct(data || {});

                if (data?.media?.length > 0) {
                    setSelectedImage(data.media[0].url);
                }
                // setRelatedProducts(res.data.data.relatedProducts || null);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        if (!portfolio) return;

        const fetchData = async () => {
            try {
                setLoadingPage(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`);
                // console.log("API Response:", res.data);
                if (res.status !== 200 || !res.data || Object.keys(res.data).length === 0) {
                    router.replace("/");
                    return;
                }
                setDetails(res.data.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 404) {
                    router.replace("/");
                } else {
                    router.replace("/");
                }
            } finally {
                setLoadingPage(false);
            }
        };

        fetchData();
    }, [portfolio]);

    const navLinks = [
        { name: "Home", href: `/${portfolio}#home`, icon: Home },
        { name: "About", href: `/${portfolio}#about-us`, icon: Info },
        { name: "Products", href: `/${portfolio}/products`, icon: ShoppingBag },
        { name: "Contact", href: `/${portfolio}#contact-us`, icon: Mail },
    ];

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return "";

        const regExp =
            /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[1]
            ? `https://www.youtube.com/embed/${match[1]}`
            : "";
    };

    useEffect(() => {
        if (product?.media?.length > 0) {
            setSelectedImage(product.media[0].url);
        }
    }, [product]);

    console.log(product)

    return (<>
        <Navbar details={details} portfolio={portfolio} navLinks={navLinks} />

        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-[500px_1fr] gap-8 items-start">
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

                        {showYoutube && product?.youtubeLink ? (
                            <iframe
                                src={getYoutubeEmbedUrl(product.youtubeLink)}
                                title="YouTube Video"
                                className="w-full h-[500px]"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <img
                                src={
                                    selectedImage ||
                                    product?.media?.[0]?.url ||
                                    "/placeholder-product.jpg"
                                }
                                alt={product?.name}
                                className="w-full h-[500px] object-contain"
                            />
                        )}
                    </div>
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                        {product?.media?.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setShowYoutube(false);
                                    setSelectedImage(item.url);
                                }}
                                className={`w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0 transition
                ${selectedImage === item.url && !showYoutube
                                        ? "border-blue-600 ring-2 ring-blue-200"
                                        : "border-slate-200"
                                    }`}
                            >
                                <img
                                    src={item.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}

                        {/* Youtube Thumbnail */}
                        {product?.youtubeLink && (
                            <button
                                onClick={() => setShowYoutube(true)}
                                className={`w-20 h-20 rounded-lg border flex flex-col items-center justify-center flex-shrink-0 transition
                ${showYoutube
                                        ? "border-red-500 ring-2 ring-red-200"
                                        : "border-slate-200"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-red-600"
                                >
                                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5v-7L16 12l-6.2 3.5z" />
                                </svg>

                                <span className="text-[10px] mt-1 text-red-600 font-medium">
                                    Video
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {product?.name}
                    </h1>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {product?.brandName && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {product.brandName}
                            </span>
                        )}

                        {product?.subCategoryId?.name && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                {product.subCategoryId.name}
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                        <span className="text-4xl font-bold text-green-600">
                            ₹{product?.price}
                        </span>

                        <span className="text-lg text-slate-500">
                            / {product?.unit || "Unit"}
                        </span>

                        {product?.oldPrice > product?.price && (
                            <>
                                <span className="line-through text-slate-400 text-lg">
                                    ₹{product.oldPrice}
                                </span>

                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {Math.round(
                                        ((product.oldPrice - product.price) /
                                            product.oldPrice) *
                                        100
                                    )}
                                    % OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Specifications */}
                    <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden">
                        <table className="w-full text-black">
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="bg-slate-50 p-4 font-medium w-1/3">
                                        Brand
                                    </td>
                                    <td className="p-4">
                                        {product?.brandName || "-"}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-300">
                                    <td className="bg-slate-50 p-4 font-medium">
                                        Mini Order Quantity
                                    </td>
                                    <td className="p-4">
                                        {product?.minOrderQty || "-"}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-300">
                                    <td className="bg-slate-50 p-4 font-medium">
                                        Packaging
                                    </td>
                                    <td className="p-4">
                                        {product?.packagingDetails || "-"}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-300">
                                    <td className="bg-slate-50 p-4 font-medium">
                                        Delivery Time
                                    </td>
                                    <td className="p-4 border-gray-300">
                                        {product?.deliveryTime || "-"}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-300">
                                    <td className="bg-slate-50 p-4 font-medium">
                                        Supply Ability
                                    </td>
                                    <td className="p-4">
                                        {product?.supplyAbility || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="bg-slate-50 p-4 font-medium">
                                        Payment Terms
                                    </td>
                                    <td className="p-4">
                                        {product?.paymentTerms || "-"}
                                    </td>
                                </tr>

                                {product?.specifications?.map((spec, index) => (
                                    <tr key={index} className="border-t border-gray-300">
                                        <td className="bg-slate-50 p-4 font-medium text-black">
                                            {spec.key}
                                        </td>
                                        <td className="p-4 text-black">
                                            {spec.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button onClick={() => { setOpenPopup(true); setPopupProduct(product) }} className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition">
                            Get Best Price
                        </button>

                        <a href={`tel:${product.supplier?.phone}`} target='blank' className="flex items-center gap-3 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition">
                            <PhoneCall size={18} /> Contact Us
                        </a>

                        <a href={`${product.supplier?.business?.social?.whatsapp}`} target='blank' className="flex items-center gap-3 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg font-semibold transition">
                            <BsWhatsapp size={20} /> Whatsapp Us
                        </a>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Product Description
                </h2>

                <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: product?.description || "",
                    }}
                />
            </div>
        </div>
        <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
        <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
    </>)
}
