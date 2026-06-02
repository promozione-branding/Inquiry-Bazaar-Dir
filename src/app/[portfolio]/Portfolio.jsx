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

export default function Portfolio() {
    const { portfolio } = useParams()
    const router = useRouter();
    const [details, setDetails] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        if (!portfolio) return;

        const fetchData = async () => {
            try {
                setLoadingPage(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}api/webpage/${portfolio}`);
                console.log("API Response:", res.data);
                if (res.status !== 200 || !res.data || Object.keys(res.data).length === 0) {
                    router.replace("/");
                    return;
                }
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
        { name: "Products", href: "#products", icon: ShoppingBag },
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
            platformEmail: "shreeshaktiinfratech@gmail.com",
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

    const [products, setProducts] = useState([]);
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const fetchSupplierProducts = async () => {
            try {
                setLoading1(true);
                const res = await axios.get(`/api/product/supplier/${details?.user._id}`);

                if (res.data.success) {
                    setProducts(res.data.data || []);
                }
            } catch (err) {
                console.error("❌ API Error:", err);
            } finally {
                setLoading1(false);
            }
        };

        if (details?.user._id) fetchSupplierProducts();
    }, [details?.user._id]);

    if (loadingPage) {
        return <CatalogSkeleton />;
    }

    return (<>
        <div className="py-2 text-black" style={{ backgroundColor: details?.hero?.color }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-20 text-sm">

                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-black" />
                        <span className="font-semibold">
                            GST Verified
                        </span>
                        <span className="opacity-90">
                            ({details?.user?.business?.gstNumber})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Factory size={18} className="text-black" />
                        <span>
                            {details?.user?.business?.businessType}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-black" />
                        <span>{details?.user?.business?.businessField}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-black" />
                        <span>{details?.user?.business?.numberOfEmployees}</span>
                    </div>

                </div>
            </div>
        </div>

        <section className="w-full bg-gray-50 border-b border-b-gray-200 sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 py-2">
                <Link href="" className="border border-gray-200 p-1">
                    <Image
                        width={200}
                        height={200}
                        src={details?.user?.profileImage || "/no-image.webp"}
                        alt="Logo"
                        className="w-auto h-16"
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-6 text-black">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <a key={index} href={link.href}
                                className="border border-gray-200 flex items-center gap-2 px-4 py-2 rounded-lg text-xl font-semibold bg-white hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <Icon size={18} />
                                {link.name}
                            </a>
                        );
                    })}

                    <button onClick={() => setOpen(true)} style={{ backgroundColor: details?.hero?.color }} className="flex items-center text-xl font-semibold gap-2 px-5 py-2 rounded-lg text-white">
                        <Phone size={18} />
                        Get in Touch
                    </button>
                </div>

                <button className="lg:hidden bg-orange-400 hover:bg-orange-500 p-3 rounded-lg text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden flex flex-col gap-4 px-4 pb-4 text-black">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <button className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 px-5 py-2 rounded-lg text-white">
                        <Phone size={18} />
                        Get in Touch
                    </button>
                </div>
            )}
        </section>

        <section id="home" className="relative w-full min-h-[70vh] flex items-center justify-center">
            <div className="absolute inset-0">
                <img
                    src={`${details?.hero?.image || "/no-image.webp"}`} // replace with your image
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-5 px-4 py-12 items-center">
                <div className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
                        {details?.hero?.heading}
                    </h1>
                    <p className="text-gray-200 max-w-md">
                        {details?.hero?.subHeading}
                    </p>
                    <button onClick={() => setOpen(true)} style={{ backgroundColor: details?.hero?.color }} className={`mt-6 px-6 py-3 rounded-lg text-white font-medium`}>
                        Get Started
                    </button>
                </div>

                {/* Right Form */}
                <div className="bg-white rounded-xl shadow-lg px-4 py-6">
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-3xl font-semibold text-gray-800 text-center flex justify-center items-center flex-col">
                                Get in Touch
                                <div style={{ backgroundColor: details?.hero?.color }} className="w-10 h-1 rounded-md mt-1"></div>
                            </h2>

                            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
                                <User size={18} className="text-gray-600 mr-2" />
                                <input
                                    name="contactPerson"
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full outline-none text-gray-800"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <div className="flex w-full items-center border rounded-lg border-gray-400 px-3 py-2">
                                    <Mail size={18} className="text-gray-600 mr-2" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full outline-none text-gray-800"
                                    />
                                </div>

                                <div className="flex w-full items-center border rounded-lg border-gray-400 px-3 py-2">
                                    <Phone size={18} className="text-gray-600 mr-2" />
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="Your Phone"
                                        className="w-full outline-none text-gray-800"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
                                <MapPin size={18} className="text-gray-600 mr-2" />
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="Your City"
                                    className="w-full outline-none text-gray-800"
                                />
                            </div>

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={3}
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 outline-none text-gray-800"
                            />

                            <button disabled={loading} style={{ backgroundColor: details?.hero?.color }} className="w-full text-white py-2 rounded-lg">
                                {loading ? "Submitting..." : "Submit Inquiry"}
                            </button>
                        </form>)}
                </div>
            </div>
        </section>

        <ProductSlider products={products} loading1={loading1} details={details} setOpen={setOpen} />

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
    md:prose-h1:text-3xl md:prose-h2:text-2xl md:prose-h3:text-xl
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
            <ProductsList products={products} loading1={loading1} details={details} setOpen={setOpen} />
        </section>

        <section id="contact-us" className="relative py-16">
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
                        href={details?.user?.business.social.whatsapp}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>

                </motion.div>
            </div>
        </section>

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
                        {details?.faqSection?.faqs.map((faq, index) => {
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

        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="bg-white p-2 rounded-lg">
                    <Image
                        src={details?.user?.profileImage || "/no-image.webp"}
                        alt="Inquiry Bazaar"
                        width={200}
                        height={200}
                        className="rounded-xl shadow-lg w-auto h-16"
                    />
                </div>

                {/* Social Icons */}
                <div className="flex gap-6">
                    {details?.user?.business?.social?.linkedin && (
                        <a
                            href={details?.user?.business.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                        >
                            <FaLinkedin size={25} className="text-blue-700" />
                        </a>
                    )}

                    {details?.user?.business?.social?.instagram && (
                        <a
                            href={details?.user?.business.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-pink-100 transition hover:scale-105"
                        >
                            <FaInstagram size={25} className="text-pink-600" />
                        </a>
                    )}

                    {details?.user?.business?.social?.facebook && (
                        <a
                            href={details?.user?.business.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                        >
                            <FaFacebook size={25} className="text-blue-600" />
                        </a>
                    )}

                    {details?.user?.business?.social?.youtube && (
                        <a
                            href={details?.user?.business.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="YouTube"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition hover:scale-105"
                        >
                            <FaYoutube size={25} className="text-red-600" />
                        </a>
                    )}

                    {details?.user?.business?.social?.telegram && (
                        <a
                            href={details?.user?.business.social.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="YouTube"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition hover:scale-105"
                        >
                            <BsTelegram size={25} className="text-blue-600" />
                        </a>
                    )}

                    {details?.user?.business?.social?.twitter && (
                        <a
                            href={details?.user?.business.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="YouTube"
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition hover:scale-105"
                        >
                            <FaXTwitter size={25} className="text-black" />
                        </a>
                    )}
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="md:flex justify-around border-t border-gray-800 py-6 text-center text-base text-gray-300">
                <p>© Copyright 2026 Inquiry Bazaar</p>

                <p className="mt-1">
                    Developed & Manage by <a target="blank" href={"https://promozionebranding.com/"} className="text-white hover:underline">Promozione Branding Pvt Ltd.</a>
                </p>
            </div>
        </footer>

        <StickyButtons details={details} />
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