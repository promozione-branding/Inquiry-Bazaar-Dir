"use client"
import { motion } from "framer-motion";
import { Package, Phone, Send } from "lucide-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
export default function CTA() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initializeRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      recaptchaRef.current,
      {
        size: "invisible",
      }
    );
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);

    const data = {
      supplierToken: "7303486777",
      platform: "Dir Home Page CTA",
      platformEmail: "lead.inquirybazaar@gmail.com",
      name: "NA",
      email: "NA",
      company: "NA",
      phone: fd.get("phone") || "NA",
      product: fd.get("product") || "NA",
      place: "NA",
      message: "NA",
    };

    if (!/^\d{10}$/.test(data.phone)) {
      return toast.error("Enter a valid 10-digit phone number");
    }

    setFormData(data);

    try {
      setSendingOtp(true);

      initializeRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        `+91${data.phone}`,
        appVerifier
      );

      setConfirmationResult(result);
      setShowOtpScreen(true);
      toast.success("OTP sent successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

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
          setSubmitted(false);
          setShowOtpScreen(false);
          setOtp("");
          setPhone("");
          setFormData(null);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      return toast.error("Please enter the OTP.");
    }

    try {
      setVerifyingOtp(true);
      await confirmationResult.confirm(otp);
      toast.success("Mobile number verified.");
      await handleSubmit();
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/invalid-verification-code":
          toast.error("Invalid OTP.");
          break;

        case "auth/code-expired":
          toast.error("OTP has expired. Please resend OTP.");
          break;

        case "auth/session-expired":
          toast.error("Session expired. Please send OTP again.");
          break;

        default:
          toast.error(err.message || "OTP verification failed.");
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <section className="bg-[#0A5B93] py-10 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center text-white"
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Get free quote as per your customised requirement
        </h2>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 md:p-6 shadow-lg"
        >
          {submitted ? (
            <div className="text-center py-1">
              <h2 className="text-2xl font-bold text-green-600">
                🎉 Thank You!
              </h2>
            </div>
          ) : !showOtpScreen ? (
            <form onSubmit={handleSendOTP} className="flex flex-col md:flex-row gap-4">
              {/* Product Input */}
              <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 flex-1">
                <Package className="text-gray-800" size={18} />
                <input
                  name="product"
                  type="text"
                  placeholder="Product / Service"
                  className="w-full outline-none text-sm text-gray-800"
                />
              </div>

              {/* Phone Input */}
              <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 flex-1">
                <Phone className="text-gray-800" size={18} />
                <input
                  maxLength={10}
                  minLength={10}
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full outline-none text-sm text-gray-800"
                />
              </div>

              {/* Button */}
              <motion.button
                disabled={sendingOtp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-[#0A5B93] text-white px-6 py-2 rounded-lg font-medium"
              >
                <Send size={16} />
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </motion.button>
            </form>)
            :
            (<div className="space-y-4">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 w-full">
                  <Phone size={18} className="text-gray-700" />

                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="w-full outline-none text-sm text-gray-800"
                  />
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button type="button" onClick={verifyOTP} disabled={verifyingOtp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    {verifyingOtp ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpScreen(false);
                      setOtp("");
                      setConfirmationResult(null);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>)}
        </motion.div>
      </motion.div>
      <div ref={recaptchaRef}></div>
    </section>
  );
}