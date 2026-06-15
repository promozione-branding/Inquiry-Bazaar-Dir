import { MessageCircle, MessageCircleCheck } from "lucide-react";
import React, { useState } from 'react'
import axios from 'axios';

export default function WhatsAppCTA({ details }) {
  const [loadingType, setLoadingType] = useState(null);

  const trackEvent = async (eventType, productDetails) => {
    // console.log("Tracking Event:", eventType);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
        {
          productId: "N/A",
          supplierToken: productDetails?.user?._id,
          eventType,
          source: "Dir Web Page",
        }
      );
    } catch (error) {
      console.log("Tracking Error:", error);
    }
  };

  const handleWhatsappClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("whatsapp");

      await trackEvent("whatsapp_click", product);

      window.open(
        link,
        "_blank"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <section className="md:py-8 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-linear-to-r from-green-600 via-green-500 to-emerald-500 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-10 h-10 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageCircleCheck
                  size={40}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  Need Bulk Pricing?
                </h2>

                <p className="text-green-50 text-base md:text-lg mt-1 text-start">
                  Get an instant quote on WhatsApp and receive the best wholesale rates.
                </p>
              </div>
            </div>

            <button onClick={() => handleWhatsappClick(details, details?.user?.business?.social?.whatsapp)} disabled={loadingType !== null}
              className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
            >
              <MessageCircle size={24} />
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}