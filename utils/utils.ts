export function calculateDiscountPercentage(
  actualPrice: number,
  discountedPrice: number
): number {
  const discountPercentage =
    ((actualPrice - discountedPrice) / actualPrice) * 100;
  return Math.round(discountPercentage);
}

// This function returns the products with highest discount percentage
export function getHighestDiscountProducts(products: any) {
  // Sort the products array by discount percentage in descending order
  const sortedProducts = products.sort((a: any, b: any) => {
    const discountA = (1 - a.discountedPrice / a.price) * 100;
    const discountB = (1 - b.discountedPrice / b.price) * 100;
    return discountB - discountA;
  });

  // Return the first 6 products in the sorted array
  return sortedProducts.slice(0, 6);
}
