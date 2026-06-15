"use client";

// import Hero from '@/components/Webpage/Layout/Hero';
import Navbar from "@/components/Webpage/Layout3/Navbar";
import ProductSlider from "@/components/Webpage/Layout3/ProductSlider";

import Testimonials from "@/components/Webpage/Layout/Testimonials";

import About from "@/components/Webpage/Layout3/About";
import Form from "@/components/Webpage/Layout3/Form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddressContact from "@/components/Webpage/Layout3/Address";
import Footer from "@/components/Webpage/Layout3/Footer";

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

  return (
    <>
      <Navbar details={details} />
      {/* <Hero details={details} /> */}
      <ProductSlider
        products={products}
        details={details}
        portfolio={portfolio}
      />
      <About details={details} />
      <Testimonials />

      <Form details={details} />

      <AddressContact details={details} />

      <Footer />
    </>
  );
}
