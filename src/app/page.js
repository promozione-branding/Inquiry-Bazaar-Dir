"use client"
import IndustrySection from "@/components/Home/AllCategorySection";
import Category from "@/components/Home/Category";
import ClienteleSlider from "@/components/Home/ClientSlider";
import CTA from "@/components/Home/CTA";
import HeroSection from "@/components/Home/HeroSection";
import HomePopup from "@/components/Home/HomePopup";
import IndustrySlider from "@/components/Home/IndustrySlider";
import Locations from "@/components/Home/Locations";
import CategoryPopup from "@/components/Main/CategoryPopup";
import Footer from "@/components/Main/Footer";
import Navbar from "@/components/Main/Navbar";
import StickyFooter from "@/components/Main/StickyFooter";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <HeroSection />
      <IndustrySlider />
      <Category />
      <ClienteleSlider />
      <IndustrySection />
      <CTA />
      <Locations />
      <Footer />
      <HomePopup productImage={"/image.jpg"} setOpen={setOpen} open={open} />
      <StickyFooter />
    </div>
  );
}
