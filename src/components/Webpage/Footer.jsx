"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsTelegram } from 'react-icons/bs'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'

export default function Footer({ details, portfolio, navLinks }) {
    return (
        <footer className="bg-gray-950 text-gray-300 md:pb-0 pb-20">
            <div className="md:px-20 px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    <div>
                        <div className="bg-white p-2 rounded-lg w-fit">
                            <Image
                                src={details?.user?.profileImage || "/no-image.webp"}
                                alt="Business Logo"
                                width={200}
                                height={200}
                                className="h-16 w-auto rounded-lg"
                            />
                        </div>

                        <p className='mt-2'>
                            At <span className='font-bold'>{details?.user?.business?.companyName},</span> we are proud to be recognised as one of India’s most trusted suppliers of
                            {details?.products?.slice(0, 4).map((i, idx) => (
                                <span className='font-bold' key={idx}> {i?.name},</span>
                            ))} etc.
                        </p>

                        <div className="flex gap-2 mt-4">
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

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {navLinks.map((i, idx) => (
                                <li key={idx}>
                                    <Link href={i?.href} className="hover:text-white transition">
                                        {i?.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href={`/${portfolio}/sitemap`} className="hover:text-white transition">
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Our Products
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {details?.products?.slice(0, 6).map((i, idx) => (
                                <li key={idx}>
                                    <Link href={`/${portfolio}/${i?.slug}`} className="hover:text-white transition">
                                        {i?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-200">
                            <li>{details?.user?.business?.address}</li>
                            <li>{details?.user?.phone}</li>
                            <li>{details?.user?.otherPhone}</li>
                            <li>{details?.user?.email}</li>
                            <li>{details?.user?.otherEmail}</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Trust & Excellence
                        </h3>

                        <p className="text-sm text-gray-200">
                            We are proud to present the TrustElite Certificate of Excellence to <span className='font-extrabold'>{details?.user?.business?.companyName},</span> recognizing their commitment to exceptional customer service, outstanding business practices, and a dedication to building trust with their customers.
                        </p>

                        <img
                            src="/trustseal.webp"
                            alt="Trust Seal"
                            className="w-28 mt-5 hover:scale-105 transition"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Inquiry Bazaar. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-400 text-center">
                        Managed & Developed by{" "}
                        <a
                            href="https://inquirybazaar.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 transition"
                        >
                            Inquiry Bazaar Pvt. Ltd.
                        </a>
                    </p>

                    <p className='bg-white rounded-md'>
                        <img src="/Business Syndicate (21).png" alt="logo" className='w-50 h-10 object-cover scale-100' style={{objectPosition:"50% 53%"}} />
                    </p>
                </div>
            </div>
        </footer>
    )
}
