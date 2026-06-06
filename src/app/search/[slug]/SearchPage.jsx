"use client"
import ContactModal from '@/components/Main/ContactModal';
import Footer from '@/components/Main/Footer';
import Navbar from '@/components/Main/Navbar';
import Sidebar from '@/components/Main/Sidebar'
import axios from 'axios';
import {
  MapPin,
  Star,
  Phone,
  Globe,
  BadgeCheck,
  ShieldCheck,
  Building2,
  Mail,
  MessageCircle,
  User,
  Link2,
  Funnel,
  FileText
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaFilePdf,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsTelegram } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

export default function SearchPage() {
  const { slug } = useParams()
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState({});
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/search/${slug}`);
        // console.log(res.data);
        const data = res.data?.data;
        setSubCategory(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const trackEvent = async (eventType, productDetails) => {
    // console.log("Tracking Event:", eventType);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
        {
          productId: productDetails?.name,
          supplierToken: productDetails?.supplier?._id,
          eventType,
          source: "Dir Category Page",
        }
      );
    } catch (error) {
      console.log("Tracking Error:", error);
    }
  };

  const handleWhatsappClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("whatsapp");

      await trackEvent("whatsapp_click", product);

      window.open(
        link,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  const handleCallClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("call");

      await trackEvent("call_click", product);

      window.location.href = `tel:${link}`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  const [loading1, setLoading1] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      supplierToken: "7303486777",
      platform: "Dir Search Category Page",
      platformEmail: "lead.inquirybazaar@gmail.com",
      name: formData.get("contactPerson"),
      email: formData.get("email"),
      company: formData.get("company") || "NA",
      phone: formData.get("phone"),
      product: subCategory?.category?.name || "NA",
      place: formData.get("city") || "NA",
      message: formData.get("message"),
    };

    if (!/^\d{10}$/.test(data.phone)) {
      return alert("Enter a valid 10-digit phone number");
    }

    try {
      setLoading1(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/add`, data,
        { validateStatus: (status) => status >= 200 && status < 500 }
      );
      if (res.status >= 200 && res.status < 300) {
        setSubmitted(true);
        setTimeout(() => {
          e.target.reset();      // reset after UI change
        }, 100);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.log("ERROR:", err?.response || err.message);
      alert("Something went wrong");
    } finally {
      setLoading1(false);
    }
  };

  return (<>
    <Navbar />

    <div className="px-4 md:px-10 py-3 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-800 gap-1 flex-wrap">
        <Link href={"/"} className="font-bold">Home</Link>
        {subCategory?.category?.industry?.name && (
          <>
            <p>/</p>
            <Link href={`/industries/${subCategory?.category?.industry?.slug}`} className="font-bold">
              {subCategory?.category?.industry?.name}
            </Link>
          </>
        )}
        {subCategory?.category?.parentCategory?.name && (
          <>
            <p>/</p>
            <Link href={`/categories/${subCategory?.category?.parentCategory?.slug}`} className="font-bold">
              {subCategory?.category?.parentCategory?.name}
            </Link>
          </>
        )}
        <p>/</p>
        <p className="text-gray-600">{subCategory?.category?.name}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-6 bg-gray-200 py-4">
      <div className="hidden lg:block lg:col-span-1">
        <div className="lg:sticky top-20">
          <Sidebar open={open} setOpen={setOpen} />
        </div>
      </div>

      <div className="lg:hidden block">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className="col-span-1 lg:col-span-4 px-2">
        <button onClick={() => setOpen(true)}
          className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-[#0A5B93] text-white rounded"
        >
          Filters <Funnel size={16} />
        </button>

        <div className="flex flex-col gap-4">
          {loading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded mb-4" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))
          ) : (subCategory?.products?.map((i, idx) => {
            const supplier = i?.supplier?.business;
            return (<div key={idx}>
              <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="pt-3 px-3 border-b">
                  <Link href={`/products/${i?.slug}`}
                    className="font-semibold text-[#0A5B93] text-base line-clamp-2"
                  >
                    {i.name}
                  </Link>
                </div>

                <div className="flex gap-3 p-3">
                  <div className="relative w-32 h-32 shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenPopup(true);
                      setPopupProduct(i);
                    }}
                  >
                    <Image
                      src={i.media?.[0]?.url || "/no-image.png"}
                      alt={i.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold text-black">
                      {i.price ? `₹ ${i.price}` : "Price on Request"}
                      {i.price && (
                        <span className="text-base font-normal text-gray-600">
                          /Piece
                        </span>
                      )}
                    </div>

                    {i.specifications?.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="text-sm mt-1">
                        <span className="text-gray-800">
                          {spec.key}:
                        </span>{" "}
                        <span className="font-semibold text-gray-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-3 border-t">
                  <h3 className="font-semibold text-[#0A5B93]">
                    {supplier?.companyName}
                  </h3>

                  <div className="text-sm text-gray-800 line-clamp-1">
                    {supplier?.address || "India"}
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(4)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={15}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <Star
                        size={15}
                        className="text-gray-300"
                      />

                      <span className="ml-1 text-sm font-medium text-gray-800">
                        4.2
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 justify-center mt-3">
                  {supplier?.social?.linkedin && (
                    <a
                      href={supplier.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={25} className="text-blue-700" />
                    </a>
                  )}

                  {supplier?.social?.instagram && (
                    <a
                      href={supplier.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                    >
                      <FaInstagram size={25} className="text-pink-600" />
                    </a>
                  )}

                  {supplier?.social?.facebook && (
                    <a
                      href={supplier.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                    >
                      <FaFacebook size={25} className="text-blue-600" />
                    </a>
                  )}

                  {supplier?.social?.youtube && (
                    <a
                      href={supplier.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube"
                    >
                      <FaYoutube size={25} className="text-red-600" />
                    </a>
                  )}

                  {supplier?.social?.telegram && (
                    <a
                      href={supplier.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Telegram"
                    >
                      <BsTelegram size={25} className="text-blue-600" />
                    </a>
                  )}

                  {supplier?.social?.twitter && (
                    <a
                      href={supplier.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter"
                    >
                      <FaXTwitter size={25} className="text-black" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 pb-3 px-3 border-t">
                  <button onClick={() => handleWhatsappClick(i, i?.supplier?.business?.social?.whatsapp)}
                    className="h-11 rounded-lg border border-green-500 text-green-600 font-semibold flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={25} />
                    WhatsApp
                  </button>

                  <button onClick={() => handleCallClick(i, i?.supplier?.phone)}
                    className="h-11 rounded-lg bg-[#0A5B93] text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Now
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="w-full h-70 relative group" onClick={(e) => { e.preventDefault(); setOpenPopup(true); setPopupProduct(i); }}>
                  <Image
                    src={i.media?.[0]?.url || "/no-image.png"}
                    alt={i?.name}
                    fill
                    className="object-contain group-hover:scale-105 transition"
                  />
                  {i?.media?.find(m => m.type === "pdf") && (
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={i.media?.find(m => m.type === "pdf").url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute flex gap-1 text-[10px] items-center justify-center -bottom-2 right-0 bg-[#0A5B93] text-white p-2 rounded-md transition"
                    >
                      <FaFilePdf size={14} className="-mt-0.5" /> Product Brochure
                    </a>
                  )}
                </div>

                <div>
                  <Link href={`/products/${i?.slug}`}
                    className="text-gray-800 hover:underline font-semibold line-clamp-2 hover:text-orange-500"
                  >
                    {i?.name}
                  </Link>

                  <div className="flex justify-between items-center mt-2 text-black">
                    <div>
                      {i.price ? (
                        <p className="text-lg font-semibold">
                          ₹{i.price}
                          <span className="text-sm font-normal">/Piece</span>
                        </p>
                      ) : (
                        <span className="bg-green-500 text-xs text-white px-2 py-1 rounded-xl">
                          On Request
                        </span>
                      )}
                    </div>

                    {i.brandName && (
                      <div className="bg-[#0A5B93] text-xs text-white px-2 py-1 rounded-xl">
                        {i.brandName}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    {i.specifications?.slice(0, 4).map((spec, index) => (
                      <div key={index}
                        className="flex justify-between gap-2 px-3 py-2.5 text-sm border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-gray-600 font-medium">
                          {spec.key}
                        </span>

                        <span className="text-gray-800 text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}

                    <Link href={`/products/${i?.slug}`}
                      className="block text-center text-sm text-[#0A5B93] hover:text-[#085082] font-medium py-2.5 hover:bg-blue-50  transition"
                    >
                      View more details →
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl space-y-3 border flex flex-col h-full">
                  <div>
                    {i?.supplier?.webpage?.slug ? (
                      <Link href={`/${i.supplier.webpage?.slug}`} className="hover:underline text-md font-semibold flex items-center gap-1 cursor-pointer group text-blue-500 transition">
                        {supplier?.companyName || "-"}
                      </Link>)
                      :
                      <h2 className="text-md font-semibold text-gray-800 flex items-center gap-1 group transition">
                        {supplier?.companyName || "-"}
                      </h2>}

                    <div className="flex items-center gap-1 mt-0.5 text-sm text-gray-800">
                      <MapPin size={14} className="text-orange-500 -mt-0.5" />
                      <span>{supplier?.address || "India"}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm mt-0.5">
                      {[...Array(4)].map((_, idx) => (
                        <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400 -mt-0.5" />
                      ))}
                      <Star size={14} className="text-gray-300 -mt-0.5" />
                      <span className="ml-1 text-gray-800 ">4.2 • 38 reviews</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 w-full bg-blue-50 text-blue-700 border border-blue-300 px-2 py-1 rounded-lg">
                      {/* <BadgeCheck size={14} /> */}
                      <Image src={"/TRUST-ELITE-8.webp"} alt="Trust Elite" width={30} height={30} />
                      Trust Elite
                    </div>

                    <div className="flex items-center gap-2 w-full bg-green-50 text-green-700 border border-green-300 px-2 py-1 rounded-lg">
                      <ShieldCheck size={20} />
                      GST Verified
                    </div>
                  </div>

                  <div className="flex gap-5 justify-center items-center my-auto">
                    {supplier?.social?.linkedin && (
                      <a
                        href={supplier.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={25} className="text-blue-700" />
                      </a>
                    )}

                    {supplier?.social?.instagram && (
                      <a
                        href={supplier.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                      >
                        <FaInstagram size={25} className="text-pink-600" />
                      </a>
                    )}

                    {supplier?.social?.facebook && (
                      <a
                        href={supplier.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                      >
                        <FaFacebook size={25} className="text-blue-600" />
                      </a>
                    )}

                    {supplier?.social?.youtube && (
                      <a
                        href={supplier.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="YouTube"
                      >
                        <FaYoutube size={25} className="text-red-600" />
                      </a>
                    )}

                    {supplier?.social?.telegram && (
                      <a
                        href={supplier.social.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Telegram"
                      >
                        <BsTelegram size={25} className="text-blue-600" />
                      </a>
                    )}

                    {supplier?.social?.twitter && (
                      <a
                        href={supplier.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                      >
                        <FaXTwitter size={25} className="text-black" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-2 mt-auto">
                    <button onClick={() => handleCallClick(i, i?.supplier?.phone)} disabled={loadingType !== null}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#0A5B93] hover:bg-[#085082] text-white py-2 rounded-lg">
                      <Phone size={14} />
                      {loadingType === "call" ? "Opening..." : " View Number"}
                    </button>

                    <button onClick={() => handleWhatsappClick(i, i?.supplier?.business?.social?.whatsapp,)} disabled={loadingType !== null}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                      <FaWhatsapp />
                      {loadingType === "whatsapp" ? "Opening..." : "WhatsApp"}
                    </button>
                  </div>
                </div>
              </div>
            </div>);
          }))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-21">
          {submitted ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-amber-600">
                🎉 Thank You!
              </h2>
              <p className="text-gray-800 mt-2">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-gray-700 text-sm mt-1">
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-2 rounded-xl">
              <h2 className="font-semibold text-lg text-[#0A5B93] text-center mb-2">
                Contact Supplier
              </h2>

              <div className="flex items-center border rounded-lg border-gray-300 shadow mb-4">
                <input
                  name="contactPerson"
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 outline-none text-black"
                />
              </div>

              <div className="flex items-center border rounded-lg border-gray-300 shadow mb-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 outline-none text-black"
                />
              </div>

              <div className="flex items-center border rounded-lg border-gray-300 shadow mb-4">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-2 outline-none text-black"
                />
              </div>

              <div className="flex items-start border rounded-lg border-gray-300 shadow mb-4">
                <textarea
                  name="message"
                  type="text"
                  rows={3}
                  placeholder="Your Message"
                  className="w-full p-2 outline-none text-black"
                />
              </div>

              <button disabled={loading1} className="w-full bg-[#0A5B93] hover:bg-[#085082] text-white py-2 rounded-lg">
                {loading1 ? "Submitting..." : "Send Inquiry"}
              </button>
            </form>)}
        </div>
      </div>
    </div>

    <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
    <Footer />
  </>)
}
