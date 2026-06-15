import { Building2,Home } from "lucide-react";

export default function AddressContact({details}) {
  return (
    <div className="max-w-2xl px-3">
     
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
      
<Home/>
        Address & Contact
      </h2>

  
      <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
      
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <Building2 size={22} />
        </div>

      
        <div>
            <h3 className="text-xl font-bold text-gray-900">
        {details?.user?.business?.companyName ?? "Company Name"}
            </h3>

          <p className="mt-1 text-gray-600 leading-7">
            No. 206, Pratap Complex, 92G, Munirka
            <br />
            New Delhi – 110067, Delhi, India
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-green-700 font-semibold">
            <a href="tel:+919818521336" className="hover:underline">
              +91 98185 21336
            </a>

            <span>•</span>

            <a
              href="mailto:info@tackinnovations.com"
              className="hover:underline"
            >
              info@tackinnovations.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}