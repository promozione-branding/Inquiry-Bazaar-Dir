"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Dot } from "lucide-react";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Stickyfooter from "@/components/Main/StickyFooter";

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/industries/tree`);
        // console.log(res.data.data);
        setIndustries(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [slug]);

  return (<>
    <Navbar />

    <section className="px-4 md:px-10 py-10 bg-gray-200 space-y-6">
      {loading ? ([...Array(2)].map((_, index) => (
        <div key={index}
          className="hidden lg:block p-4 bg-white rounded-lg animate-pulse"
        >
          {/* Industry Title */}
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Left Banner */}
            <div className="relative h-75 rounded-lg overflow-hidden bg-gray-300">
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded w-3/4"
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="h-9 w-28 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-100 p-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-lg p-2 flex gap-3"
                >
                  {/* Category Image */}
                  <div className="w-20 h-20 bg-gray-300 rounded shrink-0" />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3" />

                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-4/6" />
                      <div className="h-3 bg-gray-200 rounded w-16 mt-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )))
        :
        (industries.map((industry) => (
          <div key={industry._id} className="space-y-5">
            {/* ================= MOBILE DESIGN ================= */}
            <div className="block lg:hidden bg-white rounded-[22px] overflow-hidden shadow-sm">
              {/* TOP HERO */}
              <div className="relative h-[350px]">
                <Image
                  src={industry.imageUrl}
                  alt={industry.imageAlt || industry.name}
                  fill
                  className="object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/95 to-[#071426]/40" />

                <div className="absolute inset-0 p-6 flex flex-col justify-center">
                  <div>
                    <h2 className="text-white text-2xl font-bold leading-">
                      {industry.name.split(" ")[0]}
                      <br />
                      <span className="text-[#ff6500] text-nowrap">
                        {industry.name.split(" ").slice(1).join(" ")}
                      </span>
                    </h2>

                    <div className="w-14 h-[3px] bg-[#ff6500] mt-2"></div>

                    <div className="space-y-1 mt-10">
                      {industry.categories?.slice(0, 5).map((cat) => (
                        <div
                          key={cat._id}
                          className="flex text-nowrap items-center gap-3 text-white text-"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#ff6500]" />
                          <p>{cat.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="mt-6 inline-flex items-center justify-center gap-3 bg-[#ff6500] hover:bg-[#e65a00] text-white px-7 py-3 rounded-xl font-semibold text-lg"
                      >
                        View All
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY CARDS */}
              <div className="bg-[#f7f7f7] p-2 space-y-2 grid grid-cols-">
                {industry.categories?.slice(0, 3).map((cat) => (
                  <div key={cat._id}
                    className="bg-white rounded-2xl p-2 flex gap-2 border border-gray-200"
                  >
                    {/* IMAGE */}
                    <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.imageAlt || cat.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="text-sm font-bold text-black hover:text-[#ff6500]"
                      >
                        {cat.name}
                      </Link>

                      <div className="mt-1">
                        {cat.subCategories?.slice(0, 2).map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub.slug}`}
                            className="flex font-medium items-center gap-2 text-sm text-[#ff6500]"
                          >
                            <Dot size={18} />
                            {sub.name}
                          </Link>
                        ))}
                      </div>

                      <Link href={`/categories/${cat.slug}`}
                        className="inline-flex items-center text-sm gap-2 text-[#ff6500] font-semibold"
                      >
                        View All
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= DESKTOP OLD DESIGN ================= */}
            <div className="hidden lg:block p-4 bg-white rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#f45a06]">
                {industry.name}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="relative h-75 rounded-lg overflow-hidden">
                  <Image
                    src={industry.imageUrl}
                    alt={industry?.imageAlt || industry.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/85 to-[#071426]/30" />

                  <div className="absolute inset-0  px-5 py-2 flex flex-col justify-end">
                    <div className="text-white space-y-1.5 text-sm">
                      {industry.categories?.slice(0, 5).map((cat) => (
                        <p key={cat._id}>● {cat.name}</p>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="bg-[#f45a06] flex gap-2 hover:bg-[#e75506] text-white px-4 py-2 rounded text-sm w-fit"
                      >
                        View All   <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-100 p-4">
                  {industry.categories?.slice(0, 6).map((cat) => (
                    <div
                      key={cat._id}
                      className="bg-white border rounded-lg p-2 flex gap-3 hover:shadow-md transition h-fit"
                    >
                      <div className="w-20 h-20 relative shrink-0">
                        <Image
                          src={cat.imageUrl}
                          alt={cat?.imageAlt || cat.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div>
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="font-bold text-black hover:text-orange-600 text-sm"
                        >
                          {cat.name}
                        </Link>

                        <div className="mt-1 space-y-1 text-xs text-black">
                          {cat.subCategories?.slice(0, 3).map((sub) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        )))}
    </section>
    <Stickyfooter />
    <Footer />
  </>)
}
