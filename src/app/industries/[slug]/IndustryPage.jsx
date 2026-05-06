"use client"
import Footer from '@/components/Main/Footer'
import Navbar from '@/components/Main/Navbar'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function IndustryPage() {
  const { slug } = useParams()
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/industry/${slug}`);
        setIndustry(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (<>
    <Navbar />

    <div className='px-4 md:px-10 py-5 bg-gray-200'>
      <div className='md:flex hidden items-center text-gray-800 gap-1'>
        <Link href={"/"} className='text-gray-800 font-bold'>
          Home {" "}
        </Link>
        <p>/</p>
        <Link href={"/industries"} className='text-gray-800 font-bold'>
          Industries {" "}
        </Link>
        <p>/</p>
        <p className='text-gray-600'>
          {industry.name}
        </p>
      </div>

      <div className='px-4 py-3 bg-white mt-2 rounded-lg'>
        <h2 className='text-black text-3xl mb-2'>{industry?.name}</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-2 rounded-lg border-t border-t-gray-200'>
          {industry.mainCategory?.map((cat) => (
            <div key={cat._id}
              className="bg-white flex-col border border-gray-200 rounded-lg p-2 flex gap-2 hover:shadow-md transition h-fit"
            >
              <Link href={`/categories/${cat.slug}`}
                className="font-bold text-black hover:text-[#D01132]"
              >
                {cat.name}
              </Link>
              <div className='flex gap-2'>
                <div className="w-30 h-30 border border-gray-200 relative shrink-0">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="mt-1 space-y-1 text-sm text-black">
                    {cat.subCategory?.slice(0, 3).map((sub) => (
                      <Link key={sub._id} href={`/category/${sub.slug}`}
                        className="block hover:text-blue-500"
                      >
                        ● {sub.name}
                      </Link>
                    ))}
                    <Link href={`/categories/${cat.slug}`} className="flex items-center gap-1 hover:text-blue-500">
                      View All <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Footer />
  </>)
}
