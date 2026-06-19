import { Building2, Home, Phone, Mail } from "lucide-react";

export default function AddressContact({ details }) {
  const company =
    details?.user?.business ||
    details?.business?.companyName ||
    "Company Name";

  const mapUrl =
    details?.business?.gmbMap ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5868131497205!2d77.1662442!3d28.702004099999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0223846e0903%3A0x6b8f0fbb73c40b4c!2sSangam%20Plastic%20Industries%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1781845977301!5m2!1sen!2sin";

  return (
    <section className="py-10 md:px-10 px-4">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <div className="rounded-xl bg-green-100 p-2 text-green-700">
              <Home size={22} />
            </div>
            Address & Contact
          </h2>

          <div className="flex gap-4 rounded-2xl bg-gray-50 p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Building2 size={26} />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900">
                {company?.companyName}
              </h3>

              <p className="mt-3 leading-8 text-gray-600">
                {company.address}
                <br />
                {company.state}, India
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <a
                  className="flex items-center gap-2 font-medium text-green-700 hover:text-green-800"
                >
                  <Phone size={18} />
                  {details?.user?.phone}
                </a>

                <a
                  className="flex items-center gap-2 font-medium text-green-700 hover:text-green-800"
                >
                  <Mail size={18} />
                  {details?.user?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
          <iframe
            src={mapUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title={`Google Map - ${company}`}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}