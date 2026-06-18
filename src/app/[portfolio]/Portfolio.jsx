"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Menu,
    X,
    Home,
    Info,
    ShoppingBag,
    Mail,
    Phone, User,
    MapPin, Users, Briefcase, Award, Clock, Eye, FileText, MessageCircle, Plus, Minus, ShieldCheck,
    Building2,
    BadgeCheck,
    Factory,
} from "lucide-react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaXTwitter } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";
import Popup from "@/components/Main/Popup";
import ProductSlider from "@/components/Webpage/ProductSlider";
import ProductsList from "@/components/Webpage/ProductsList";
import StickyButtons from "@/components/Webpage/StickyButtons";
import Navbar from "@/components/Webpage/Navbar";
import Footer from "@/components/Webpage/Footer";
import Stickyfooter from "@/components/Webpage/StickyFooter";

export default function Portfolio() {
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
                console.log(res.data.data)
                setProducts(res.data.data?.products || []);
                setDetails(res.data.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 404) {
                    router.replace("/");
                } else {
                    router.replace("/");
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

    const stats = [
        {
            icon: Clock,
            number: `${details?.work?.experience}`,
            suffix: "+",
            label: "Years Experience",
        },
        {
            icon: Users,
            number: `${details?.work?.clients}`,
            suffix: "+",
            label: "Happy Clients",
        },
        {
            icon: Briefcase,
            number: `${details?.work?.projects}`,
            suffix: "+",
            label: "Projects Completed",
        },
        {
            icon: Award,
            number: `${details?.work?.awards}`,
            suffix: "+",
            label: "Awards Won",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            supplierToken: details?.user?._id,
            platform: "Inquiry Bazaar Dir Portfolio Form",
            platformEmail: details?.user?.email || "NA",
            name: formData.get("contactPerson"),
            email: formData.get("email"),
            company: 'NA',
            phone: formData.get("phone"),
            product: "Bar Bending Machine",
            place: formData.get("city"),
            message: formData.get("message"),
        };

        if (!/^\d{10}$/.test(data.phone)) {
            return alert("Enter a valid 10-digit phone number");
        }

        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/add`, data,
                { validateStatus: (status) => status >= 200 && status < 500 }
            );
            if (res.status >= 200 && res.status < 300) {
                setSubmitted(true);
                setTimeout(() => {
                    e.target.reset();      // reset after UI change
                }, 100);
                setTimeout(() => {
                    setSubmitted(false);
                    setSubmitted(false);
                }, 3000);
            }
        } catch (err) {
            console.log("ERROR:", err?.response || err.message);
            alert("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

    if (loadingPage) {
        return <CatalogSkeleton />;
    }
    // console.log(details)

    return (<>
        <Navbar details={details} portfolio={portfolio} navLinks={navLinks} />

        <div id="home">
            <ProductSlider products={details?.featuredProducts?.products || products} loading1={loadingPage} details={details} setOpen={setOpen} portfolio={portfolio} />
        </div>

        <section className="relative py-16">

            <div className="absolute inset-0">
                <img
                    src="/banner.png"
                    alt="cta background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center px-4 text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    {details?.cta?.heading}
                </motion.h2>

                <p className="text-gray-200 mb-6">
                    {details?.cta?.subHeading}
                </p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >

                    {/* Call Now */}
                    <a
                        href={`tel:${details?.user?.phone}`}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium transition"
                    >
                        <Phone size={18} />
                        Call Now
                    </a>

                    {/* Request Quote */}
                    <button onClick={() => setOpen(true)} className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-medium transition">
                        <FileText size={18} />
                        Request a Quote
                    </button>



                    {/* WhatsApp */}
                    <a
                        href={details?.user?.business?.social?.whatsapp}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>

                </motion.div>
            </div>
        </section>

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

        <section className="relative py-10">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/banner.png"
                    alt="background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: false }}
                                className="p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-3 text-orange-400">
                                    <Icon size={32} />
                                </div>

                                {/* Number */}
                                <h3 className="text-2xl md:text-3xl font-bold">
                                    <CountUp end={item.number} duration={2} />
                                    {item.suffix}
                                </h3>

                                {/* Label */}
                                <p className="text-white/80 mt-1">
                                    {item.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>

        <section id="products" className="py-10 bg-gray-100">
            <ProductsList products={details?.popularProducts?.products || products} loading1={loadingPage} details={details} setOpen={setOpen} portfolio={portfolio} />
        </section>

        <sectio id="contact-us" style={{ backgroundColor: details?.hero?.color }}
            className="py-12 px-4 md:px-8"
        >
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    {submitted ? (
                        <div className="text-center py-10">
                            <h2 className="text-2xl font-bold text-amber-600">
                                🎉 Thank You!
                            </h2>

                            <p className="text-gray-800 mt-2">
                                Your enquiry has been submitted successfully.
                            </p>

                            <p className="text-gray-700 text-sm mt-1">
                                Our team will contact you shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-4xl font-semibold text-gray-800 text-center mb-6 flex justify-center flex-col items-center">
                                Send Inquiry
                                <div className="bg-black w-15 h-1 mt-2"></div>
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="flex items-center text-black border border-gray-300 rounded-lg px-3 py-3">
                                        <User size={18} className="text-gray-500 mr-2" />
                                        <input
                                            name="contactPerson"
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full outline-none"
                                        />
                                    </div>

                                    <div className="flex items-center text-black border border-gray-300 rounded-lg px-3 py-3">
                                        <MapPin size={18} className="text-gray-500 mr-2" />
                                        <input
                                            name="city"
                                            type="text"
                                            placeholder="Your City"
                                            className="w-full outline-none"
                                        />
                                    </div>

                                    <div className="flex items-center text-black border border-gray-300 rounded-lg px-3 py-3">
                                        <Mail size={18} className="text-gray-500 mr-2" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full outline-none"
                                        />
                                    </div>

                                    <div className="flex items-center text-black border border-gray-300 rounded-lg px-3 py-3">
                                        <Phone size={18} className="text-gray-500 mr-2" />
                                        <input
                                            maxLength={10}
                                            minLength={10}
                                            name="phone"
                                            type="tel"
                                            placeholder="Your Phone"
                                            className="w-full outline-none"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    name="message"
                                    rows={3}
                                    placeholder="Your Message"
                                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 outline-none"
                                />

                                <button type="submit" disabled={loading}
                                    style={{ backgroundColor: details?.hero?.color, }}
                                    className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                                >
                                    {loading ? "Submitting..." : "Submit Inquiry"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </sectio>

        <section className="py-10 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                    <img
                        src={`${details?.faqSection?.image || "/no-image.webp"}`}
                        alt="machine"
                        className="max-h-112 object-contain"
                    />
                </div>

                <div>
                    <div className="mb-6">
                        <p className="text-orange-500 font-semibold uppercase text-sm">
                            Popular Questions
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    {/* FAQ */}
                    <div className="space-y-3">
                        {details?.faqSection?.faqs?.map((faq, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg border overflow-hidden"
                                >
                                    {/* Question */}
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex justify-between items-center px-4 py-4 text-left"
                                    >
                                        <span className="font-medium text-gray-800">
                                            {faq.question}
                                        </span>

                                        {isOpen ? (
                                            <Minus size={18} className="text-gray-800" />
                                        ) : (
                                            <Plus size={18} className="text-gray-800" />
                                        )}
                                    </button>

                                    {/* Answer */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-4 pb-4 text-gray-600"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>

        <Footer details={details} portfolio={portfolio} navLinks={navLinks} />

        <StickyButtons details={details} />
        <Stickyfooter details={details} portfolio={portfolio} />
        <Popup open={open} setOpen={setOpen} details={details} />
    </>)
}


function CatalogSkeleton() {
    return (
        <div className="animate-pulse">

            {/* Top Supplier Strip */}
            <div className="h-12 bg-gray-200" />

            {/* Header */}
            <div className="sticky top-0 bg-white border-b">
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="h-16 w-40 bg-gray-200 rounded" />

                    <div className="hidden lg:flex gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-10 w-28 bg-gray-200 rounded"
                            />
                        ))}
                    </div>

                    <div className="h-10 w-36 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Hero */}
            <section className="relative min-h-[70vh] bg-gray-300">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4 py-16">

                    <div>
                        <div className="h-12 w-3/4 bg-gray-200 rounded mb-4" />
                        <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                        <div className="h-5 w-4/5 bg-gray-200 rounded mb-6" />

                        <div className="h-12 w-40 bg-gray-200 rounded" />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-6" />

                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-12 bg-gray-200 rounded mb-4"
                            />
                        ))}

                        <div className="h-24 bg-gray-200 rounded mb-4" />

                        <div className="h-12 bg-gray-200 rounded" />
                    </div>

                </div>
            </section>

            {/* Product Slider */}
            <section className="py-10 px-4">
                <div className="h-10 w-64 bg-gray-200 rounded mb-6" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="border rounded-lg overflow-hidden bg-white"
                        >
                            <div className="h-52 bg-gray-200" />
                            <div className="p-4">
                                <div className="h-5 bg-gray-200 rounded mb-2" />
                                <div className="h-5 w-2/3 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About */}
            <section className="py-12 px-4">
                <div className="grid lg:grid-cols-2 gap-10">

                    <div>
                        <div className="h-8 w-40 bg-gray-200 rounded mb-4" />
                        <div className="h-12 w-3/4 bg-gray-200 rounded mb-6" />

                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="h-4 bg-gray-200 rounded mb-3"
                            />
                        ))}
                    </div>

                    <div className="h-80 bg-gray-200 rounded-xl" />
                </div>
            </section>

            {/* Stats */}
            <section className="py-10 px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-40 bg-gray-200 rounded-xl"
                        />
                    ))}
                </div>
            </section>

            {/* Products */}
            <section className="py-10 px-4">
                <div className="h-10 w-56 bg-gray-200 rounded mb-6" />

                <div className="grid md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg border overflow-hidden"
                        >
                            <div className="h-48 bg-gray-200" />
                            <div className="p-4">
                                <div className="h-5 bg-gray-200 rounded mb-2" />
                                <div className="h-5 w-2/3 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="py-10 px-4">
                <div className="h-10 w-64 bg-gray-200 rounded mb-8" />

                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-16 bg-gray-200 rounded mb-3"
                    />
                ))}
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 p-8">
                <div className="h-16 w-40 bg-gray-700 rounded mb-6" />

                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-10 w-10 rounded-full bg-gray-700"
                        />
                    ))}
                </div>
            </footer>
        </div>
    );
}