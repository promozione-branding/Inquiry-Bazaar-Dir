import {
  ShieldCheck,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { FaLock } from "react-icons/fa";

export default function CTA({ details }) {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "GST Verified",
      subtitle: "Business Verified",
      color: "text-green-600",
    },
    {
      icon: MapPin,
      title: `${details?.user?.business?.state || "India"} Based`,
      subtitle: "Local Supplier",
      color: "text-blue-600",
    },
    {
      icon: Package,
      title: "Bulk Orders",
      subtitle: "Best Wholesale Price",
      color: "text-orange-500",
    },
    {
      icon: Truck,
      title: "PAN India Delivery",
      subtitle: "Fast & Safe Delivery",
      color: "text-blue-600",
    },
    {
      icon: FaLock,
      title: "Secure Inquiries",
      subtitle: "100% Buyer Protection",
      color: "text-red-600",
    },
  ];

  return (
    <section className="py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-md border border-gray-100 overflow-hidden">

        <div
          className="
    grid grid-cols-2 lg:grid-cols-5
    divide-y divide-gray-200
    lg:divide-y-0
    lg:divide-x
  "
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
          flex flex-col sm:flex-row
          items-center sm:items-start
          text-center sm:text-left
          gap-3 p-4 md:p-6
        "
              >
                <Icon
                  size={36}
                  className={`${item.color} shrink-0`}
                />

                <div>
                  <h3 className="font-bold text-sm md:text-lg text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-600">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
} 