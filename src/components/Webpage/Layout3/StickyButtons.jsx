import {

  Phone,
  Send,


} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import axios from 'axios';
import React, { useState } from 'react'

const StickyButtons1 = ({details}) => {
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

  const handleCallClick = async (product, link) => {
    if (loadingType) return;

    try {
      setLoadingType("call");

      await trackEvent("call_click", product);

      window.location.href = `tel:${link}`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };
  return (
    <div className='w-full fixed bottom-0 left-0 z-50 lg:hidden'>
      {/* Buttons */}
      <div className="border-t bg-white p-3 flex gap-2">

        <button className="flex-1 h-[54px] rounded-xl bg-[#13653A] text-white font-semibold flex items-center justify-center gap-2">
          <Send size={18} />
          Send Inquiry
        </button>

        <button onClick={() => handleCallClick(details, details?.user?.phone)} disabled={loadingType !== null} className="h-[54px] px-6 rounded-xl border border-[#13653A] text-[#13653A] font-semibold flex items-center gap-2">
          <Phone size={18} />
          Call
        </button>

        <button onClick={() => handleWhatsappClick(details, details?.user?.business?.social?.whatsapp)} disabled={loadingType !== null} className="h-[54px] w-[54px] rounded-xl bg-[#25D366] flex items-center justify-center text-white">
          <FaWhatsapp size={22} />
        </button>
      </div>
    </div>
  )
}

export default StickyButtons1
