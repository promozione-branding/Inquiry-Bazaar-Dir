"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    text: "Excellent quality products and very competitive pricing. Highly recommended!",
    author: "Retailer, Delhi",
  },
  {
    text: "Fast delivery and genuine products. Our go-to supplier for mobile accessories.",
    author: "Distributor, UP",
  },
  {
    text: "Great service and good support. Always available when needed.",
    author: "Retailer, Rajasthan",
  },
  {
    text: "Professional team and excellent product quality. Looking forward to future business.",
    author: "Wholesaler, Mumbai",
  },
  {
    text: "Reliable supplier with competitive rates and timely dispatch.",
    author: "Dealer, Gujarat",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between md:mb-10 mb-5">
          <h2 className="text-xl md:text-4xl font-bold text-slate-900">
            WHAT OUR CUSTOMERS SAY
          </h2>

          <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
            View All
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="relative">

          <Swiper
            modules={[Autoplay]}
            // navigation={{
            //   prevEl: ".testimonial-prev",
            //   nextEl: ".testimonial-next",
            // }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-10!"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all h-full min-h-[240px]">

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="font-semibold text-slate-800 text-lg">
                    — {review.author}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}