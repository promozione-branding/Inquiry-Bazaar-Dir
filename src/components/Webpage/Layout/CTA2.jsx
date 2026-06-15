import {
  Building2,
  Users,
  Package,
  BadgeCheck,
} from "lucide-react";

export default function CTA2({details}) {
    const prod=details?.products?.length || 0;

  const stats = [
    {
      icon: Building2,
      value: `${details?.work?.experience}`,
      label: "Years in Business",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: `${details?.work?.clients}`,
      label: "Happy Customers",
      color: "text-green-600",
    },
    {
      icon: Package,
      value: `${prod}+`,
      label: "Products Available",
      color: "text-orange-500",
    },
    {
      icon: BadgeCheck,
      value: "100%",
      label: "Customer Satisfaction",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
        
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`
                  flex items-center gap-3 p-5 md:p-6
                  ${
                    index !== stats.length - 1
                      ? "lg:border-r border-gray-200"
                      : ""
                  }
                  ${
                    index < 2
                      ? "border-b lg:border-b-0 border-gray-200"
                      : ""
                  }
                `}
              >
                <Icon
                  className={`${item.color} shrink-0`}
                  size={38}
                />

                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-slate-800">
                    {item.value}
                  </h3>

                  <p className="text-sm md:text-base text-gray-500">
                    {item.label}
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