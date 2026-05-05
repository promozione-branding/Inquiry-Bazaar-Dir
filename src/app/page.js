import IndustrySection from "@/components/Home/AllCategorySection";
import Category from "@/components/Home/Category";
import ClienteleSlider from "@/components/Home/ClientSlider";
import CTA from "@/components/Home/CTA";
import HeroSection from "@/components/Home/HeroSection";
import IndustrySlider from "@/components/Home/IndustrySlider";
import Locations from "@/components/Home/Locations";
import Footer from "@/components/Main/Footer";
import Navbar from "@/components/Main/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <HeroSection />
      <IndustrySlider />
      <Category />
      <ClienteleSlider />
      <IndustrySection />
      <Locations />
      <CTA />
      <Footer />
    </div>
  );
}
