"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Tag, IndianRupee, Store, MapPin, Mail, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function HomePopup({ productImage, setOpen, open }) {
    const recaptchaRef = useRef(null);
    // const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [formData, setFormData] = useState(null);
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    useEffect(() => {
        if (!productImage) return;

        const timer = setTimeout(() => {
            setOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, [productImage]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/add`,
                formData,
                {
                    validateStatus: (status) => status >= 200 && status < 500,
                }
            );

            if (res.status >= 200 && res.status < 300) {
                setSubmitted(true);
                toast.success("Enquiry submitted successfully.");
                setTimeout(() => {
                    closePopup()
                }, 3000);
            }

        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp) return toast.error("Enter OTP");

        try {
            setVerifyingOtp(true);
            await confirmationResult.confirm(otp);
            toast.success("Mobile number verified.");
            await handleSubmit();
        } catch (err) {
            console.error(err);

            switch (err.code) {
                case "auth/invalid-verification-code":
                    toast.error("Invalid OTP");
                    break;

                case "auth/code-expired":
                    toast.error("OTP has expired");
                    break;

                case "auth/session-expired":
                    toast.error("Session expired. Please send OTP again.");
                    break;

                default:
                    toast.error("OTP verification failed");
            }
        } finally {
            setVerifyingOtp(false);
        }
    };

    const initializeRecaptcha = async () => {
        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch { }
            window.recaptchaVerifier = null;
        }

        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            recaptchaRef.current,
            {
                size: "invisible",
            }
        );

        await window.recaptchaVerifier.render();
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            supplierToken: "7303486777",
            platform: "Dir Category Page Popup",
            platformEmail: "lead.inquirybazaar@gmail.com",
            name: fd.get("contactPerson"),
            email: fd.get("email"),
            company: fd.get("company") || "NA",
            phone: fd.get("phone"),
            product: "NA",
            place: fd.get("city") || "NA",
            message: fd.get("message"),
        };

        // Validation
        if (!data.name) return toast.error("Enter your name");
        if (!data.email) return toast.error("Enter email");
        if (!data.message) return toast.error("Enter requirement");

        if (!/^\d{10}$/.test(data.phone)) {
            return toast.error("Enter valid phone number");
        }

        setFormData(data);

        try {
            setSendingOtp(true);
            initializeRecaptcha();
            // const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, `+91${data.phone}`, window.recaptchaVerifier);
            setConfirmationResult(result);
            setShowOtpScreen(true);
            toast.success("OTP sent successfully.");
        } catch (err) {
            console.error(err);

            switch (err.code) {
                case "auth/too-many-requests":
                    toast.error("Too many OTP requests. Please try again later.");
                    break;

                case "auth/invalid-phone-number":
                    toast.error("Invalid phone number.");
                    break;

                default:
                    toast.error("Failed to send OTP.");
            }
        } finally {
            setSendingOtp(false);
        }
    };

    const closePopup = () => {
        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch { }

            window.recaptchaVerifier = null;
        }

        setShowOtpScreen(false);
        setConfirmationResult(null);
        setOtp("");
        setFormData(null);
        setPhone("");
        setSubmitted(false);
        setOpen(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed z-50 top-1/2 left-1/2 md:w-[60%] w-[90%] p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg overflow-hidden"
                    >

                        <div className="grid md:grid-cols-2 gap-8 relative">
                            <button className="absolute -top-2 -right-1 text-gray-800 hover:text-black" onClick={() => closePopup()}>
                                <X />
                            </button>

                            <div className="md:flex flex-col hidden">
                                <div className="relative rounded-xl overflow-hidden h-full">

                                    <img
                                        src={productImage || "/image.jpg"}
                                        alt="Requirement"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold">
                                            Get the Best Deals
                                        </h3>

                                        <p className="text-sm mt-2 opacity-90">
                                            Share your requirement and receive quotes
                                            from verified sellers.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {submitted ? (
                                <div className="text-center py-20">
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
                            ) : (!showOtpScreen ?
                                (<form onSubmit={handleSendOTP} className="space-y-4">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-[#082C62]">
                                            Looking for?
                                        </h2>

                                        <p className="text-gray-600 mt-1 text-sm">
                                            Let us know your requirement, and get quotes from
                                            <span className="font-semibold text-orange-500">
                                                {" "}trusted sellers!
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <User size={16} className="text-orange-500" />
                                        <input
                                            name="contactPerson"
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <Mail size={16} className="text-orange-500" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-center border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <Phone size={16} className="text-orange-500" />

                                        <input
                                            type="tel"
                                            name="phone"
                                            maxLength={10}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Phone Number"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <div className="flex items-start border rounded-lg px-2 border-gray-300 shadow-sm">
                                        <MessageCircle size={16} className="text-orange-500 mt-3" />
                                        <textarea
                                            name="message"
                                            type="text"
                                            rows={4}
                                            placeholder="Your Requirement"
                                            className="w-full p-2 outline-none text-black"
                                        />
                                    </div>

                                    <button disabled={sendingOtp} className="w-full bg-[#082C62] hover:bg-[#074f83] text-white py-2 rounded-lg">
                                        {sendingOtp ? "Sending OTP..." : "Send OTP"}
                                    </button>
                                </form>)
                                :
                                (<div className="space-y-4 flex flex-col justify-center">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-[#082C62]">
                                            Verify Mobile Number
                                        </h2>

                                        <p className="text-gray-600 mt-2 text-base">
                                            OTP sent to
                                            <span className="font-semibold text-orange-500">
                                                {" "}+91 {formData?.phone}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center border rounded-lg px-3 border-gray-300 shadow-sm">
                                        <PhoneCall size={20} className="text-orange-500" />
                                        <input
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength={6}
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full p-3 outline-none text-black"
                                        />
                                    </div>

                                    <button type="button" onClick={verifyOTP} disabled={verifyingOtp}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                                    >
                                        {verifyingOtp ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowOtpScreen(false);
                                            setConfirmationResult(null);
                                            setOtp("");
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                                    >
                                        Edit Details
                                    </button>
                                </div>))}
                        </div>
                    </motion.div>
                </>
            )}

            <div
                id="recaptcha-container"
                ref={recaptchaRef}
                className="hidden"
            />
        </AnimatePresence>
    );
}