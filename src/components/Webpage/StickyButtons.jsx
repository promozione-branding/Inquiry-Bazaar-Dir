import axios from 'axios';
import React, { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6'

export default function StickyButtons({ details }) {
    console.log("StickyButtons Details:", details);
    const [loadingType, setLoadingType] = useState(null);

    const trackEvent = async (eventType, productDetails) => {
        // console.log("Tracking Event:", eventType);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/create`,
                {
                    productId: "N/A",
                    supplierToken: productDetails?.supplier?._id,
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

    return (<>
        {details?.supplier?.business?.social?.whatsapp && (
            <button onClick={() => handleWhatsappClick(details, details?.supplier?.business?.social?.whatsapp)} disabled={loadingType !== null}
                className={`fixed bottom-5 right-4 z-50 text-white p-3 rounded-full shadow-lg transition
             ${loadingType == "whatsapp" ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 animate-bounce"}`}>
                <FaWhatsapp size={30} />
            </button>
        )}

        {details?.supplier?.phone && (
            <button onClick={() => handleCallClick(details, details?.supplier?.phone)} disabled={loadingType !== null}
                className={`fixed bottom-21 right-4 z-50 text-white p-3 rounded-full shadow-lg transition
                 ${loadingType == "call" ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 animate-bounce"}`}>
                <FaPhoneAlt size={27} />
            </button>
        )}
    </>)
}