"use client"
import Footer from '@/components/Main/Footer'
import Navbar from '@/components/Main/Navbar'
import Stickyfooter from '@/components/Main/StickyFooter'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Category() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/categories/${slug}`);
        console.log(res.data.data);
        const data = res.data?.data;
        setCategory(data?.category || null);
        setSubCategory(data?.subCategories || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  // console.info(subCategory);
  return (<>
    <Navbar />

    <div className='px-2 md:px-4 xl:px-10 py-5 bg-gray-200'>
      <div className='md:flex hidden items-center text-gray-800 gap-1 mb-4 flex-wrap'>
        <Link href={"/"} className='text-gray-800 font-bold'>
          Home {" "}
        </Link>
        {category?.industry && (
          <>
            <p>/</p>
            <Link href={`/industries/${category?.industry?.slug}`} className='text-gray-800 font-bold'>
              {category?.industry?.name}
            </Link>
          </>
        )}
        <p>/</p>
        <p className='text-gray-600'>
          {category?.name}
        </p>
      </div>

      <div className="md:px-4 px-2 py-4 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {category?.name}
        </h2>
        {loading ? (Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx}
            className="bg-white rounded-lg border mb-4 flex gap-6 border-gray-200 shadow-md animate-pulse"
          >
            {/* Left Category Section */}
            <div className="w-45 flex flex-col items-center p-4 border-r border-gray-200">
              <div className="w-28 h-28 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Products Section */}
            <div className="flex-1 overflow-hidden py-3">
              <div className="flex gap-8">
                {Array.from({ length: 8 }).map((_, productIdx) => (
                  <div
                    key={productIdx}
                    className="min-w-35 border border-gray-200 rounded-lg p-2"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-2"></div>

                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>

                    <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))) : (subCategory?.map((i, idx) => (
          <div key={idx} className="bg-white rounded-lg border mb-4 flex gap-4 border-gray-200 shadow-md">
            <div className="w-30 md:w-45 flex flex-col items-center p-4 justify-center border-r border-r-gray-200 pr-4">
              <div className="w-28 h-28 relative mb-2">
                <Image
                  src={i.imageUrl}
                  alt={i?.imageAlt || i.name}
                  fill
                  className="object-contain"
                />
              </div>

              <Link href={`/category/${i?.slug}`}
                className="md:text-base text-xs text-center font-semibold text-gray-800 hover:text-[#EC771C]"
              >
                {i.name}
              </Link>
            </div>

            <div className="flex-1 overflow-x-auto py-3">
              <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-6">
                {i?.products?.slice(0, 8).map((product, index) => (
                  <Link href={`/products/${product.slug}`} key={index}
                    className="p-2 min-w-35 flex flex-col rounded-lg group items-center text-center border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition"
                  >
                    <div className="w-24 h-24 relative mb-2">
                      <Image
                        src={product.media?.[0]?.url || "/noimage.png"}
                        alt={product?.media?.[0]?.altName || product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-800 group-hover:text-[#EC771C] transition">
                      {product.name}
                    </p>

                    {/* Price */}
                    {product.price && (
                      <p className="text-sm text-[#082C62] mt-1">
                        ₹{product.price}
                      </p>
                    )}
                  </Link>
                ))}
              </div>

              {i?.products?.length > 5 && (
                <div className="hidden md:flex justify-center mt-4">
                  <Link href={`/category/${i?.slug}`}
                    className="bg-[#EC771C] hover:bg-[#e06e17] text-white px-6 py-2 rounded text-sm"
                  >
                    View More ↓
                  </Link>
                </div>
              )}
            </div>
          </div>
        )))}
      </div>
    </div>
    <Stickyfooter />
    <Footer />
  </>
  )
}