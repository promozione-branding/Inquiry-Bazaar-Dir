import { Info } from "lucide-react";

export default function AboutCompany({ details }) {
  return (
    <section className="bg-[#f5f5f5] p-4 md:p-6 rounded-xl">
      
    {/* head */}
      <div className="flex items-center gap-2 mb-4">
        <Info size={18} className="text-[#156734]" />
        <h2 className="text-[28px] font-bold text-[#111827]">
          About Company
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
  {/* about detail */}
        <div>
          <p className="text-[17px] leading-8 text-gray-700">
            {details?.about ||
              `With three decades of expertise, we specialize in supplying
              industrial products and solutions for various industries.
              Our commitment to quality, innovation and customer
              satisfaction helps businesses find the right products
              for every application.`}
          </p>
        </div>

  
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <img
            src={details?.aboutImage || "/about-company.jpg"}
            alt="About Company"
            className="w-full h-[320px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}