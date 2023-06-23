import { CouponDto } from "@/admin/containers/coupon/AllCoupons";

export function calculateDiscountPercentage(
  actualPrice: number,
  discountedPrice: number
): number {
  const discountPercentage =
    ((actualPrice - discountedPrice) / actualPrice) * 100;
  return Math.round(discountPercentage);
}

export const calculatePrice = (cartItems: any, coupon: CouponDto | null) => {
  const subTotal = cartItems.reduce(
    (a: any, c: any) => a + c.quantity * c.discountedPrice,
    0
  );

  if (coupon?.discountType === "percentage") {
    const total = subTotal - subTotal * (coupon.discount * 0.01);
    const discount = subTotal * (coupon.discount * 0.01);
    return { total, discount, subTotal };
  }

  if (coupon?.discountType === "price") {
    const total = subTotal - coupon.discount;
    const discount = coupon.discount;
    return { total, discount, subTotal };
  }

  return { subTotal };
};

// Scroll to bottom of the current page
export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
