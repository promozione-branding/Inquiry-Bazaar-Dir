import { Star } from "lucide-react";

export const getSupplierStats = (phone) => {
  if (!phone) {
    return { rating: "4.4", reviews: 28 };
  }

  const digits = phone.toString().replace(/\D/g, "");
  const sum = [...digits].reduce((acc, digit) => acc + Number(digit), 0);

  return {
    rating: (4.0 + (sum % 8) * 0.1).toFixed(1), // 4.0 - 4.7
    reviews: 10 + ((sum * 7) % 41), // 10 - 50
  };
};

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating >= fullStars + 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={14}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative w-[14px] h-[14px]">
          <Star
            size={14}
            className="absolute text-gray-300 fill-gray-300"
          />
          <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={14}
          className="text-gray-300"
        />
      ))}
    </>
  );
};