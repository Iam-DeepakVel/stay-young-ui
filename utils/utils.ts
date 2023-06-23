import { CouponDto } from "@/admin/containers/coupon/AllCoupons";

export function calculateDiscountPercentage(
  actualPrice: number,
  discountedPrice: number
): number {
  const discountPercentage =
    ((actualPrice - discountedPrice) / actualPrice) * 100;
  return Math.round(discountPercentage);
}

export const calculatePrice = (cartItems: any[], coupon: CouponDto | null) => {
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

export const generateCheckoutMessage = (
  cartItems: any[],
  price: { subTotal: number; discount?: number; total?: number },
  coupon: CouponDto | null
): string => {
  const formattedCartItems = cartItems.map((item: any, index: number) => {
    const productLink = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/product/${item.slug}`;
    return `${index + 1}. 📦 Product Name: ${item.name}\n   🏷️ Category: ${
      item.category[0].name
    }\n   💰 Single Item Price: ${item.discountedPrice}\n   🛒 Quantity: ${
      item.quantity
    }\n   🔗 Product Link: ${productLink}`;
  });

  const priceDetails = `---PRICE DETAILS---\n   💲 SubTotal: ${
    price.subTotal
  }\n   💸 Discount: ${price.discount || 0}\n   💰 Total Price: ${
    price.total || price.subTotal
  }`;

  const couponCode = `---COUPON DETAILS---\n   🎟️ Coupon Code: ${
    coupon?.code || "NO COUPON USED"
  }`;

  const encodedMessage = encodeURIComponent(
    `---PRODUCT DETAILS---\n${formattedCartItems.join(
      "\n\n"
    )}\n\n${priceDetails}\n\n${couponCode}`
  );

  return encodedMessage;
};

// Scroll to bottom of the current page
export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
