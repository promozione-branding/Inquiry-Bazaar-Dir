"use client"
import ContactModal from '@/components/Main/ContactModal';
import Footer from '@/components/Main/Footer';
import Navbar from '@/components/Main/Navbar';
import Sidebar from '@/components/Main/Sidebar'
import axios from 'axios';
import { IndianRupee, MapPin, Store, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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

    <div className='px-4 md:px-10 py-4 bg-gray-200'>
      <div className='flex items-center text-gray-800 gap-1'>
        <Link href={"/"} className='text-gray-800 font-bold'>
          Home {" "}
        </Link>
        <p>/</p>
        <Link href={`/categories`} className='text-gray-800 font-bold'>
          All Categories
        </Link>
        <p>/</p>
        <p className='text-gray-600'>
          {subCategory?.category?.name}
        </p>
      </div>
    </div>

    <div className="flex relative">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 px-4 bg-gray-200">
        <button onClick={() => setOpen(true)}
          className="md:hidden mb-4 px-4 py-2 bg-[#0A5B93] text-white rounded"
        >
          Filters
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subCategory?.products?.map((i, idx) => (
            <Link href={`/products/${i?.slug}`} key={idx}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-200"
            >
              <div className="w-full h-40 relative mb-2">
                <Image
                  src={i.media?.[0]?.url || "/noimage.png"}
                  alt={i?.name}
                  fill
                  className="object-contain group-hover:scale-105 transition"
                />
              </div>

              <p className="text-gray-800 font-semibold line-clamp-2 group-hover:text-[#0A5B93] transition">
                {i?.name}
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

      <ContactModal open={openPopup} setOpen={setOpenPopup} product={popupProduct} />
    </div>

    <Footer />
  </>)
}
