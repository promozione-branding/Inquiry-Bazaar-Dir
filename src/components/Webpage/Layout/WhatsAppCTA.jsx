import { MessageCircle, MessageCircleCheck } from "lucide-react";
export default function WhatsAppCTA() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto pb-10 md:pb-0">
        <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-3xl p-6 md:p-8 shadow-xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageCircleCheck
                  size={40}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  Need Bulk Pricing?
                </h2>

                <p className="text-green-50 text-base md:text-lg mt-1">
                  Get an instant quote on WhatsApp and receive the best wholesale rates.
                </p>
              </div>
            </div>

            {/* Right Button */}
            <a
              href="https://wa.link/2fpjmq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
            >
              <MessageCircle size={24} />
              Chat Now
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}