import { reviews } from "../..//data";

const REVIEWS_PER_PRODUCT = 3;

export const getProductReviews = (productId) => {
  if (!productId) return [];

  let reviewMap = JSON.parse(localStorage.getItem("productReviewMap") || "{}");

  // Assign a review group only once
  if (!(productId in reviewMap)) {
    const totalGroups = Math.floor(reviews.length / REVIEWS_PER_PRODUCT);

    const nextGroup = Object.keys(reviewMap).length % totalGroups;

    reviewMap[productId] = nextGroup;

    localStorage.setItem(
      "productReviewMap",
      JSON.stringify(reviewMap)
    );
  }

  const group = reviewMap[productId];

  const start = group * REVIEWS_PER_PRODUCT;

  return reviews.slice(start, start + REVIEWS_PER_PRODUCT);
};