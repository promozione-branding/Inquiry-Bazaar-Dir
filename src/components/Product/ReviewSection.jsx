import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const stats = [
  { label: "Response", value: 83 },
  { label: "Quality", value: 100 },
  { label: "Delivery", value: 71 },
];

const dummyReviews = [
  {
    name: "Rahul Sharma",
    rating: 4.8,
    location: "Delhi",
    review:
      "Very professional supplier. The product quality was excellent and the quotation was shared quickly. Highly recommended.",
  },
  {
    name: "Priya Verma",
    rating: 4.3,
    location: "Mumbai",
    review:
      "Good communication and timely response. Pricing was reasonable and delivery was as promised.",
  },
  {
    name: "Amit Kumar",
    rating: 4.7,
    location: "Jaipur",
    review:
      "Satisfied with the service. Genuine supplier with quality products. Will definitely purchase again.",
  },
  {
    name: "Neha Gupta",
    rating: 4.5,
    location: "Noida",
    review:
      "Excellent customer support and fast communication. The supplier was very cooperative throughout the process.",
  },
  {
    name: "Vikas Singh",
    rating: 4.2,
    location: "Lucknow",
    review:
      "Received the quotation on time and the quality matched our expectations. Overall a good experience.",
  },
  {
    name: "Pooja Agarwal",
    rating: 4.6,
    location: "Pune",
    review:
      "Professional team with excellent service. Looking forward to working with them again.",
  },
  {
    name: "Rohit Jain",
    rating: 4.4,
    location: "Ahmedabad",
    review:
      "The supplier maintained good communication and delivered quality products within the promised timeline.",
  },
  {
    name: "Anjali Mehta",
    rating: 4.7,
    location: "Chandigarh",
    review:
      "Highly satisfied with the overall experience. Genuine products and very responsive support.",
  },
  {
    name: "Sandeep Yadav",
    rating: 4.3,
    location: "Indore",
    review:
      "Pricing was competitive and the supplier answered all our queries professionally.",
  },
  {
    name: "Karan Malhotra",
    rating: 4.8,
    location: "Gurugram",
    review:
      "Reliable supplier with excellent product quality. Delivery was exactly as committed.",
  },
  {
    name: "Sneha Kapoor",
    rating: 4.4,
    location: "Bengaluru",
    review:
      "Very good buying experience. Communication was smooth and product quality was impressive.",
  },
  {
    name: "Arjun Patel",
    rating: 4.6,
    location: "Surat",
    review:
      "Packaging was excellent and the supplier handled the order professionally from start to finish.",
  },
  {
    name: "Meera Joshi",
    rating: 4.5,
    location: "Hyderabad",
    review:
      "The team was very supportive and provided timely updates during the entire process.",
  },
  {
    name: "Nitin Arora",
    rating: 4.2,
    location: "Ludhiana",
    review:
      "Good service and genuine products. Would recommend this supplier to others.",
  },
  {
    name: "Ritika Saini",
    rating: 4.7,
    location: "Faridabad",
    review:
      "Very responsive supplier with quality products and excellent after-sales support.",
  },
  {
    name: "Mohit Bansal",
    rating: 4.3,
    location: "Ghaziabad",
    review:
      "The entire ordering process was smooth. Happy with the quality and professionalism.",
  },
  {
    name: "Shreya Kapoor",
    rating: 4.8,
    location: "Kolkata",
    review:
      "Excellent service, timely delivery and transparent pricing. Definitely recommended.",
  },
  {
    name: "Harsh Verma",
    rating: 4.6,
    location: "Kanpur",
    review:
      "Supplier responded quickly and provided all the required technical details before ordering.",
  },
  {
    name: "Komal Sharma",
    rating: 4.4,
    location: "Nagpur",
    review:
      "Satisfied with the quality and support. Delivery was completed without any issues.",
  },
  {
    name: "Yash Gupta",
    rating: 4.5,
    location: "Bhopal",
    review:
      "Very trustworthy supplier with good communication and quality products. Overall a great experience.",
  },
];

export default function RatingsUI({ reviews, rating }) {
  const getRatingBreakdown = (reviews) => {
    const five = Math.floor(reviews * (0.58 + Math.random() * 0.12));
    const four = Math.floor(reviews * (0.18 + Math.random() * 0.08));
    const three = Math.floor(reviews * (0.10 + Math.random() * 0.05));
    const two = Math.floor(reviews * (0.05 + Math.random() * 0.03));
    const one = reviews - five - four - three - two;

    return [
      {
        star: 5,
        count: five,
        value: Math.round((five / reviews) * 100),
        color: "bg-green-600",
      },
      {
        star: 4,
        count: four,
        value: Math.round((four / reviews) * 100),
        color: "bg-green-500",
      },
      {
        star: 3,
        count: three,
        value: Math.round((three / reviews) * 100),
        color: "bg-lime-500",
      },
      {
        star: 2,
        count: two,
        value: Math.round((two / reviews) * 100),
        color: "bg-yellow-500",
      },
      {
        star: 1,
        count: one,
        value: Math.round((one / reviews) * 100),
        color: "bg-red-500",
      },
    ];
  };

  const ratings = getRatingBreakdown(reviews);

  const randomReviews = [...dummyReviews]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

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
              {rating}<span className="text-base sm:text-lg text-gray-500">/5</span>
            </h2>

            <div className="flex text-yellow-400 text-base sm:text-lg mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              {reviews} Ratings
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
          </div>

          <div className="space-y-5">
            {randomReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-gray-200 rounded-2xl p-5 bg-white hover:shadow-lg transition-all duration-300"
              >
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-lg">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.name}
                      </h4>

                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {review.location}
                      </p>

                      <div className="flex items-center gap-1 mt-2">
                        {renderRatingStars(review.rating)}

                        <span className="ml-1 text-sm text-gray-600">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    Verified Buyer
                  </span>
                </div>

                {/* Review */}
                <p className="text-gray-600 leading-7 mt-5">
                  {review.review}
                </p>

                {/* Bottom */}
                <div className="border-t mt-5 pt-4 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                    <ThumbsUp size={16} />
                    Helpful
                  </button>

                  <span className="text-xs text-gray-400">
                    Purchased via InquiryBazaar
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const renderRatingStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating >= full + 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <>
      {[...Array(full)].map((_, i) => (
        <FaStar key={`f-${i}`} className="text-yellow-400" size={14} />
      ))}

      {half && <FaStarHalfAlt className="text-yellow-400" size={14} />}

      {[...Array(empty)].map((_, i) => (
        <FaRegStar key={`e-${i}`} className="text-yellow-400" size={14} />
      ))}
    </>
  );
};

