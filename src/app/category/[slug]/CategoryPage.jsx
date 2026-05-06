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
  User
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsTelegram } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

export default function CategoryPage() {
  const { slug } = useParams()
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState({});

  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/category/${slug}`);
        const data = res.data?.data;
        setSubCategory(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  return (<>
    <Navbar />

    <div className="px-4 md:px-10 py-4 bg-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-800 gap-1">
        <Link href={"/"} className="font-bold">Home</Link>
        <p>/</p>
        <Link href={`/categories`} className="font-bold">All Categories</Link>
        <p>/</p>
        <p className="text-gray-600">{subCategory?.category?.name}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-6 bg-gray-200 pb-4">
      <div className="hidden lg:block lg:col-span-1 h-full bg-white">
        <div className="lg:sticky top-17">
          <Sidebar open={open} setOpen={setOpen} />
        </div>
      </div>

      <div className="lg:hidden block">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className="col-span-1 lg:col-span-4 px-2">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden mb-4 px-4 py-2 bg-[#0A5B93] text-white rounded"
        >
          Filters
        </button>

        <div className="flex flex-col gap-4">
          {subCategory?.products?.map((i, idx) => {
            const supplier = i?.supplier?.business;
            return (
              <div key={idx}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div className="w-full h-70 relative group" onClick={(e) => { e.preventDefault(); setOpenPopup(true); setPopupProduct(i); }}>
                  <Image
                    src={i.media?.[0]?.url || "/noimage.png"}
                    alt={i?.name}
                    fill
                    className="object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div>
                  <Link
                    href={`/products/${i?.slug}`}
                    className="text-gray-800 hover:underline font-semibold line-clamp-2 group-hover:text-[#0A5B93]"
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
                    {i.specifications?.slice(0, 5).map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between gap-2 px-3 py-2 text-sm border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-gray-600 font-medium">
                          {spec.key}
                        </span>

                        <span className="text-gray-800 text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}

                    <Link
                      href={`/products/${i?.slug}`}
                      className="block text-center text-sm text-[#0A5B93] font-medium py-2 hover:bg-gray-50 transition"
                    >
                      View more details →
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl space-y-2 border">
                  <div>
                    <h2 className="text-md font-semibold text-gray-800">
                      {supplier?.companyName || "-"}
                    </h2>

                    <div className="flex items-center gap-1 text-sm text-gray-800">
                      <MapPin size={14} className="text-[#0A5B93] -mt-0.5" />
                      <span>{supplier?.address || "India"}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-sm">
                      {[...Array(4)].map((_, idx) => (
                        <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400 -mt-0.5" />
                      ))}
                      <Star size={14} className="text-gray-300 -mt-0.5" />
                      <span className="ml-1 text-gray-800 ">4.2 • 38 reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                      <BadgeCheck size={14} /> Trust Elite
                    </div>

                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                      <ShieldCheck size={14} /> GST Verified
                    </div>

                    {/* <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                      <Building2 size={14} /> {supplier?.businessType}
                    </div> */}
                  </div>

                  <div className="flex gap-3 justify-center my-4">
                    {supplier?.social?.linkedin && (
                      <a
                        href={supplier.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                      >
                        <FaLinkedin size={18} className="text-blue-700" />
                      </a>
                    )}

                    {supplier?.social?.instagram && (
                      <a
                        href={supplier.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-pink-100 transition hover:scale-105"
                      >
                        <FaInstagram size={18} className="text-pink-600" />
                      </a>
                    )}

                    {supplier?.social?.facebook && (
                      <a
                        href={supplier.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                      >
                        <FaFacebook size={18} className="text-blue-600" />
                      </a>
                    )}

                    {supplier?.social?.youtube && (
                      <a
                        href={supplier.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="YouTube"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition hover:scale-105"
                      >
                        <FaYoutube size={18} className="text-red-600" />
                      </a>
                    )}

                    {supplier?.social?.telegram && (
                      <a
                        href={supplier.social.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Telegram"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                      >
                        <BsTelegram size={18} className="text-blue-600" />
                      </a>
                    )}

                    {supplier?.social?.twitter && (
                      <a
                        href={supplier.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                      >
                        <FaXTwitter size={18} className="text-black" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-2">
                    <a href={`tel:${i?.supplier?.phone}`} target="_blank"
                      className="w-full flex items-center justify-center gap-2 bg-[#0A5B93] text-white py-2 rounded-lg">
                      <Phone size={14} />
                      View Number
                    </a>

                    <a
                      href={supplier?.social?.whatsapp}
                      target="_blank"
                      className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>);
          })}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-17">
          <div className="space-y-4 bg-white p-2 rounded-xl">
            <h2 className="font-semibold text-lg text-[#D01132] text-center">
              Contact Supplier
            </h2>
            <div className="flex items-center border rounded-lg px-2 border-gray-400">
              <User size={16} className="text-[#0A5B93]" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 outline-none text-black"
              />
            </div>

            <div className="flex items-center border rounded-lg px-2 border-gray-400">
              <Mail size={16} className="text-[#0A5B93]" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 outline-none text-black"
              />
            </div>

            <div className="flex items-center border rounded-lg px-2 border-gray-400">
              <Phone size={16} className="text-[#0A5B93]" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 outline-none text-black"
              />
            </div>

            <div className="flex items-start border rounded-lg px-2 border-gray-400">
              <MessageCircle size={16} className="text-[#0A5B93] mt-3" />
              <textarea
                type="text"
                placeholder="Your Message"
                className="w-full p-2 outline-none text-black"
              />
            </div>

            <button className="w-full bg-[#0A5B93] text-white py-2 rounded-lg">
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>

    <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
    <Footer />
  </>)
}
