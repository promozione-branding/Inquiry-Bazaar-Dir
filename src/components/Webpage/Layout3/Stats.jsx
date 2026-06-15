export default function CTA2({ details }) {
  const prod = details?.products?.length || 0;

  const stats = [
    {
      value: `${details?.work?.experience || 0}+`,
      label: "Years in business",
    },
    {
      value: `${details?.work?.projects}+`,
      label: "Projects Completed",
    },
    {
      value: `${details?.work?.awards}+`,
      label: "Awards Won",
    },
    {
      value: `${details?.work?.clients || 0}+`,
      label: "Clients",
    },
  ];

  return (
    <section className="w-full bg-[#f4f4f4] border border-gray-300">
      <div className="grid grid-cols-2 md:grid-cols-4 px-1 py-4 gap-5">
        {stats.map((item, index) => (
          <div key={index}
            className={`flex flex-col items-center justify-center ${index !== stats.length - 1 ? "border-r border-gray-300" : ""
              }`}
          >
            <h2 style={{ color: details?.hero?.color }} className="text-[25px] md:text-[40px] font-bold leading-none">
              {item.value}
            </h2>

            <p className="mt-2 text-[15px] md:text-[20px] text-black font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}