"use client"
import Footer from '@/components/Main/Footer'
import Navbar from '@/components/Main/Navbar'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Category() {
  const { slug } = useParams()

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/category/${slug}`);
        const data = res.data?.data;
        setCategory(data?.category || null);
        setSubCategory(data?.subcategories || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  // console.info(category);
  return (<>
    <Navbar />

    <div className='px-4 md:px-10 py-5 bg-gray-200'>
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

      <div className="px-4 py-4 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {category?.categoryDescription}
        </h2>

        {subCategory?.map((i, idx) => (
          <div key={idx} className="bg-white rounded-lg border mb-4 flex gap-6 border-gray-200 shadow-md">
            <div className="w-45 flex flex-col items-center p-4 justify-center border-r border-r-gray-200 pr-4">
              <div className="w-28 h-28 relative mb-2">
                <Image
                  src={i.imageUrl}
                  alt={i.name}
                  fill
                  className="object-contain"
                />
              </div>

              <Link href={`/category/${i.slug}`}
                className="text-center font-semibold text-gray-800 hover:text-orange-500"
              >
                {i.name}
              </Link>
            </div>

            <div className="flex-1 overflow-x-auto py-3">
              <div className="flex gap-8 items-start">
                {i.products.slice(0, 8).map((product, index) => (
                  <Link href={`/products/${product.slug}`} key={index}
                    className="p-2 min-w-35 flex flex-col rounded-lg group items-center text-center border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition"
                  >
                    <div className="w-24 h-24 relative mb-2">
                      <Image
                        src={product.media?.[0]?.url || "/noimage.png"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-800 group-hover:text-orange-500 transition">
                      {product.name}
                    </p>

                    {/* Price */}
                    {product.price && (
                      <p className="text-sm text-orange-500 mt-1">
                        ₹{product.price}
                      </p>
                    )}
                  </Link>
                ))}
              </div>

              {i.products.length > 8 && (
                <div className="flex justify-center mt-4">
                  <Link
                    href={`/${i.slug}`}
                    className="bg-[#2E3192] text-white px-6 py-2 rounded text-sm"
                  >
                    View More ↓
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    <Footer />
  </>
  )
}