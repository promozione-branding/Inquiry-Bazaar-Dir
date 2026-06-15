export default function CTA2({ details }) {
  const prod = details?.products?.length || 0;

  const stats = [
    {
      value: `${details?.work?.experience || 0}+`,
      label: "Years in business",
    },
    {
      value: `${prod}+`,
      label: "Products",
    },
    {
      value: `${details?.brands?.length || 0}+`,
      label: "Brands",
    },
    {
      value: `${details?.work?.clients || 0}+`,
      label: "Clients",
    },
  ];

  return (
  <section className="w-full bg-[#f4f4f4] border border-gray-300">
  <div className="grid grid-cols-4 px-1">
    {stats.map((item, index) => (
      <div
        key={index}
        className={`flex flex-col items-center justify-center h-18 ${
          index !== stats.length - 1 ? "border-r border-gray-300" : ""
        }`}
      >
        <h2 className="text-[18px] md:text-[22px] font-bold text-[#0E5C3A] leading-none">
          {item.value}
        </h2>

        <p className="mt-2 text-[11px] text-black font-medium">
          {item.label}
        </p>
      </div>
    ))}
  </div>
</section>
  );
}