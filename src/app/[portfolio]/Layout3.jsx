"use client";

// import Hero from '@/components/Webpage/Layout/Hero';
import Navbar3 from "@/components/Webpage/Layout3/Navbar";
import ProductSlider from "@/components/Webpage/Layout3/ProductSlider";

import Testimonials from "@/components/Webpage/Layout/Testimonials";

import About from "@/components/Webpage/Layout3/About";
import Form from "@/components/Webpage/Layout3/Form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddressContact from "@/components/Webpage/Layout3/Address";
import Footer from '@/components/Webpage/Footer';
import StickyButtons1 from "@/components/Webpage/Layout3/StickyButtons";
import Stats from "@/components/Webpage/Layout3/Stats"
import Gmb from "@/components/Webpage/Layout3/Gmb"
import Image from "next/image";
import ProductsList from "@/components/Webpage/ProductsList";
import Popup from "@/components/Main/Popup";
import RequestForm from '@/components/Webpage/Layout/RequestForm';
import { Home, Info, Mail, ShoppingBag } from "lucide-react";
import StickyButtons from "@/components/Webpage/StickyButtons";

export default function Layout2() {
  const { portfolio } = useParams();
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!portfolio) return;

    const fetchData = async () => {
      try {
        setLoadingPage(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`,
        );

        if (
          res.status !== 200 ||
          !res.data ||
          Object.keys(res.data).length === 0
        ) {
          router.replace("/");
          return;
        }
        setProducts(res.data.data?.products || []);
        setDetails(res.data.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
        }
      } finally {
        setLoadingPage(false);
      }
    };

    fetchData();
  }, [portfolio, router]);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about-us", icon: Info },
    { name: "Products", href: `${portfolio}/products`, icon: ShoppingBag },
    { name: "Contact", href: "#contact-us", icon: Mail },
  ];

  return (
    <>
      <Navbar3 details={details} portfolio={portfolio} />
      <Stats details={details} />

      <ProductSlider
        products={details?.featuredProducts?.products || products}
        details={details}
        portfolio={portfolio}
        setOpen={setOpen}
      />

      <section id="about-us" className="bg-amber-50 px-4 py-10 md:px-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="">
          <div className="w-fit text-lg px-4 py-1 mb-2 rounded-full font-medium text-orange-600 bg-orange-200">
            {details?.about?.heading}
          </div>
          <h1 className="text-3xl md:text-5xl mb-4 text-black font-bold">
            {details?.about?.subHeading}
          </h1>

          <div
            className="
                jodit-content 
                prose max-w-none
                prose-h1:text-xl prose-h1:font-bold prose-h1:leading-snug
                prose-h2:text-lg prose-h2:font-semibold
                prose-h3:text-base
                prose-p:text-sm
                md:prose-h1:text-3xl md:prose-h2:text-2xl md:prose-h3:text-xl text-black!
              "
            dangerouslySetInnerHTML={{ __html: details?.about?.description }}
          />
        </div>

        <div>
          <Image
            width={200}
            height={200}
            className="w-full h-80 object-contain"
            alt="image"
            src={details?.about?.image || "/no-image.webp"}
          />
        </div>
      </section>

      <div className="py-10">
        <ProductsList products={details?.popularProducts?.products || products} loading1={loadingPage} details={details} setOpen={setOpen} portfolio={portfolio} />
      </div>

      <Testimonials />

      <RequestForm details={details} />

      <AddressContact details={details} />

      <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
      <Popup open={open} setOpen={setOpen} details={details} />
      <StickyButtons1 details={details} />
      {/* <StickyButtons details={details} /> */}
    </>
  );
}
