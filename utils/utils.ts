export function calculateDiscountPercentage(
  actualPrice: number,
  discountedPrice: number
): number {
  const discountPercentage =
    ((actualPrice - discountedPrice) / actualPrice) * 100;
  return Math.round(discountPercentage);
}

// Scroll to bottom of the current page
export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
