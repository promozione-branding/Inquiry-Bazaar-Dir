

export default function GMBCard({ details }) {
  return (
<div className=" my-3 mx-3 ">

  <div className="w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
  <iframe
    src={
      details?.business?.gmbMap ||
      "https://www.google.com/maps/embed?pb=..."
    }
    className="w-full h-[30vh]  border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    title={`Google Map - ${
      details?.business?.companyName || "Business Location"
    }`}
  />
</div>
</div>


  );
}