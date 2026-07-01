import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { FaStar } from "react-icons/fa";

const ratings = [
  { star: 5, value: 65, color: "bg-green-600" },
  { star: 4, value: 7, color: "bg-green-500" },
  { star: 3, value: 7, color: "bg-green-500" },
  { star: 2, value: 4, color: "bg-yellow-500" },
  { star: 1, value: 17, color: "bg-red-500" },
];

const stats = [
  { label: "Response", value: 83 },
  { label: "Quality", value: 100 },
  { label: "Delivery", value: 71 },
];

// const reviews = [
//   {
//     name: "Aarav Sharma",
//     place: "Indore",
//     date: "2 days ago",
//     rating: 5,
//     review:
//       "Excellent service. Fast response and the final delivery exceeded expectations. Highly recommended.",
//     tags: ["Response", "Quality", "Delivery"],
//   },
//   {
//     name: "Manish",
//     place: "Delhi",
//     date: "1 week ago",
//     rating: 4,
//     review:
//       "Good experience overall. Delivery was smooth and communication was professional.",
//     tags: ["Quality", "Delivery"],
//   },
//   {
//     name: "Jyoti Gupta",
//     place: "Bihar",
//     date: "3 weeks ago",
//     rating: 5,
//     review:
//       "Amazing support and excellent quality. Everything was completed before deadline.",
//     tags: ["Response", "Quality"],
//   },
// ];

export default function RatingsUI({productReviews}) {
  console.log(productReviews);
  return (
    <div className="px-3 sm:px-6 md:px-10 mt-5">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* LEFT */}
          <div className="flex flex-col items-start lg:w-44">
            <h2 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Ratings & Reviews
            </h2>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {productReviews?.[0]?.rating}<span className="text-base sm:text-lg text-gray-500">/5</span>
            </h2>

            <div className="flex text-yellow-400 text-base sm:text-lg mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              {productReviews?.[0]?.total} Ratings
            </p>
          </div>

          {/* BARS */}
          <div className="flex-1 space-y-2 sm:space-y-3">
            {ratings.map((item) => (
              <div key={item.star} className="flex items-center gap-2 sm:gap-3">

                <span className="text-xs sm:text-sm text-gray-600 w-5 sm:w-6">
                  {item.star}
                </span>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full ${item.color}`}
                  />
                </div>

                <span className="text-xs sm:text-sm text-gray-500 w-8 sm:w-10 text-right">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

          {/* CIRCLES */}
          <div className="flex justify-between sm:justify-start gap-6 sm:gap-8">
            {stats.map((item, i) => (
              <div key={i} className="flex flex-col items-center">

                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="#16a34a"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={165}
                      strokeDashoffset={165 - (165 * item.value) / 100}
                      initial={{ strokeDashoffset: 165 }}
                      animate={{
                        strokeDashoffset:
                          165 - (165 * item.value) / 100,
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  </svg>

                  <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">
                    {item.value}%
                  </span>
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Customer Reviews
            </h3>

            <button className="text-green-600 text-sm font-medium hover:underline">
              View all →
            </button>
          </div>

          <div className="space-y-5">
  {productReviews?.[0]?.reviews?.map((review, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="border rounded-xl p-5 hover:shadow-md transition bg-white"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center">
          {review.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">
            {review.name}
          </h4>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(review.rating)].map((_, idx) => (
              <FaStar
                key={idx}
                size={14}
                className="text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-600 mt-4 leading-7 text-sm">
        {review.comment}
      </p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t flex justify-between text-sm">
        <button className="text-gray-500 hover:text-green-600">
          👍 Helpful
        </button>

        <button className="text-gray-500 hover:text-gray-800">
          Report
        </button>
      </div>
    </motion.div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}