"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Industries() {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/industry");
        setIndustries(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (<>
    <Navbar />

    <section className="px-4 md:px-10 py-10 bg-gray-200 space-y-6">
      {industries.map((industry) => (
        <div key={industry._id} className="p-4 bg-white rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            {industry.name}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="relative h-75 rounded-lg overflow-hidden">
              <Image
                src={industry.imageUrl}
                alt={industry.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 p-5 flex flex-col justify-end">
                <div className="text-white space-y-2 text-sm">
                  {industry.mainCategory?.slice(0, 5).map((cat) => (
                    <p key={cat._id}>● {cat.name}</p>
                  ))}
                </div>
                <div className="mt-4 flex justify-center items-center">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-block bg-[#D01132] hover:bg-[#c10928] text-white px-4 py-2 rounded text-sm w-fit"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-100 p-4">
              {industry.mainCategory?.map((cat) => (
                <div key={cat._id}
                  className="bg-white border rounded-lg p-2 flex gap-3 hover:shadow-md transition h-fit"
                >
                  <div className="w-20 h-20 relative shrink-0">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <Link href={`/categories/${cat.slug}`}
                      className="font-bold text-black hover:text-blue-600 text-sm"
                    >
                      {cat.name}
                    </Link>

                    <div className="mt-1 space-y-1 text-xs text-black">
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
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>

    <Footer />
  </>)
}
