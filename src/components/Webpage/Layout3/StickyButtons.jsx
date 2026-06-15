import React from 'react'
import {
 
  Phone,
  Send,

  
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const StickyButtons = () => {
  return (
    <div className='w-full fixed bottom-0 left-0 z-200'>
        {/* Buttons */}
  <div className="border-t bg-white p-3 flex gap-2">
    
    <button className="flex-1 h-[54px] rounded-xl bg-[#13653A] text-white font-semibold flex items-center justify-center gap-2">
      <Send size={18} />
      Send Inquiry
    </button>

    <button className="h-[54px] px-6 rounded-xl border border-[#13653A] text-[#13653A] font-semibold flex items-center gap-2">
      <Phone size={18} />
      Call
    </button>

    <button className="h-[54px] w-[54px] rounded-xl bg-[#25D366] flex items-center justify-center text-white">
      <FaWhatsapp size={22} />
    </button>
  </div>
    </div>
  )
}

export default StickyButtons
