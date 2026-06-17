export default function Page() {

    
  const policies = [
    {
      title: "Privacy Policy",
      desc: "Learn how we collect, use, and protect your personal information.",
      link: "https://inquirybazaar.com/privacy-policy",
    },
    {
      title: "Shipping Policy",
      desc: "View delivery timelines, shipping methods, and related terms.",
      link: "https://inquirybazaar.com/shipping-policy",
    },
    {
      title: "Terms & Conditions",
      desc: "Read the terms governing the use of our platform and services.",
      link: "https://inquirybazaar.com/terms-conditions",
    },
    {
      title: "Return & Refund Policy",
      desc: "Understand our refund eligibility and return procedures.",
      link: "https://inquirybazaar.com/return-refund",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Terms & Policies
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Access all important policies and legal information related to
            Inquiry Bazaar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {policies.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                bg-white
                rounded-3xl
                p-8
                border
                border-gray-200
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#EC771C] to-[#0f8e81] flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
                    />
                  </svg>
                </div>

                <span className="text-[#EC771C] font-semibold group-hover:translate-x-1 transition">
                  View →
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}