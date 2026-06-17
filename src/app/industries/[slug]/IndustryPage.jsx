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
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/industries/${slug}`);
        // console.log(res.data.data);
        setIndustry(res.data.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [slug]);


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
          {industry?.name}
        </p>
      </div>

      <div className='px-4 py-3 bg-white mt-2 rounded-lg'>
        <h2 className='text-black text-3xl mb-2'>{industry?.name}</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-lg'>
          {loading ? ([...Array(8)].map((_, index) => (
            <div key={index}
              className="bg-white border border-gray-200 rounded-lg p-2 flex flex-col gap-3 h-fit"
            >
              {/* Title */}
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />

              <div className="flex gap-2">
                {/* Image */}
                <div className="w-30 h-30 border border-gray-200 bg-gray-200 rounded animate-pulse shrink-0" />

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/6 bg-gray-200 rounded animate-pulse" />

                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mt-3" />
                </div>
              </div>
            </div>
          ))
          ) : (industry?.categories?.length > 0 ? (industry?.categories?.map((cat) => (
            <div key={cat?._id}
              className="bg-white flex-col border border-gray-200 rounded-lg p-2 flex gap-1 hover:shadow-md transition h-fit"
            >
              <Link href={`/categories/${cat?.slug}`}
                className="font-bold text-lg text-gray-800 hover:text-orange-500"
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
                    {cat.subCategories?.slice(0, 4).map((sub) => (
                      <Link
                        key={sub._id}
                        href={`/category/${sub.slug}`}
                        className="block hover:text-orange-500"
                      >
                        ● {sub.name}
                      </Link>
                    ))}

                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-1 hover:text-orange-500"
                    >
                      View All <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center text-gray-800 py-10">
              No categories found
            </div>
          ))}
        </div>
      </div>
    </div>

    <Footer />
  </>)
}
