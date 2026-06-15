"use client"
import Footer from '@/components/Webpage/Footer';
import CTA from '@/components/Webpage/Layout/CTA';
import CTA2 from '@/components/Webpage/Layout/CTA2';
import Hero from '@/components/Webpage/Layout/Hero';
import Navbar from '@/components/Webpage/Layout/Navbar'
import ProductSlider from '@/components/Webpage/Layout/ProductSlider';
import RequestForm from '@/components/Webpage/Layout/RequestForm';
import Testimonials from '@/components/Webpage/Layout/Testimonials';
import WhatsAppCTA from '@/components/Webpage/Layout/WhatsAppCTA';
import ProductsList from '@/components/Webpage/ProductsList';
import StickyButtons from '@/components/Webpage/StickyButtons';
import axios from 'axios';
import { Home, Info, Mail, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Layout2() {
    const { portfolio } = useParams()
    const router = useRouter();
    const [details, setDetails] = useState(null)
    const [open, setOpen] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!portfolio) return;

        const fetchData = async () => {
            try {
                setLoadingPage(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`);
                // console.log("API Response:", res.data);
                if (res.status !== 200 || !res.data || Object.keys(res.data).length === 0) {
                    router.replace("/");
                    return;
                }
                setProducts(res.data.data?.products || []);
                setDetails(res.data.data);

            } catch (err) {
                console.error(err);
                if (err.response?.status === 404) {
                    // router.replace("/");
                } else {
                    // router.replace("/");
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
    console.log(details);
    return (
        <>
            <Navbar details={details} />
            {/* <Hero details={details} /> */}
            <ProductSlider products={products} details={details} portfolio={portfolio} />
            <CTA details={details} />
            <RequestForm details={details} />
            <ProductsList products={products} loading1={loadingPage} details={details} setOpen={setOpen} portfolio={portfolio} />
            <CTA2 details={details} />
            <Testimonials />
            <WhatsAppCTA details={details} />
            <Footer details={details} portfolio={portfolio} navLinks={navLinks} />
            <StickyButtons details={details} />
        </>
    )
}
