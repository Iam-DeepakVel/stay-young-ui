import CartItem from "@/components/CartItem";
import Wrapper from "@/layouts/Wrapper";
import { StoreContext } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CouponDto } from "@/admin/containers/coupon/AllCoupons";
import { calculatePrice, generateCheckoutMessage } from "@/utils/utils";

const couponFormSchema = z.object({
  code: z.string().min(1, "Please enter the coupon code to apply."),
});

type CouponFormSchemaType = z.infer<typeof couponFormSchema>;

enum discountType {
  PERCENTAGE = "percentage",
  PRICE = "price",
}

const Cart = () => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;

  const [coupon, setCoupon] = useState<CouponDto | null>(null);
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormSchemaType>({
    resolver: zodResolver(couponFormSchema),
  });

  const onSubmit: SubmitHandler<CouponFormSchemaType> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon/check-validity`,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const coupon = await response.json();
        setCoupon(coupon);

        coupon.discountType === discountType.PERCENTAGE &&
          setMessage(`Hurray! You have got a discount of ${coupon.discount}%`);

        coupon.discountType === discountType.PRICE &&
          setMessage(
            `Hurray! You have got a flat discount of Rs.${coupon.discount}`
          );
      } else {
        const errorData = await response.json();
        setCoupon(null);
        setMessage(errorData.message);
      }
    } catch (error) {
      setCoupon(null);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setMessage("");
    }
  };

  // Calculating discount and total based on coupon
  const price = calculatePrice(cartItems, coupon);

  // Generating message to send it through whatsapp
  const checkoutMessage = generateCheckoutMessage(cartItems, price, coupon);

  return (
    <div className=" w-full md:py-20">
      <Wrapper>
        {/* Heading */}
        <div className=" text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1 className=" text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </h1>
        </div>

        {/*Cart content  */}
        <div className=" flex flex-col lg:flex-row gap-12 py-10">
          {/* Cart Items */}
          <div className="flex-[2]">
            {/*Cart Empty Screen*/}
            {cartItems.length === 0 ? (
              <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                <Image
                  src="/assets/images/empty-cart.jpg"
                  alt="empty-cart"
                  width={300}
                  height={300}
                  className="w-[300px] md:w-[400px]"
                />
                <span className="text-xl font-bold">Your cart is empty</span>
                <span className="text-center mt-4">
                  Looks like you have not added anything in your cart.
                  <br />
                  Go ahead and explore top categories.
                </span>
                <Link
                  href="/"
                  className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <h3 className=" text-lg font-bold">Cart Items</h3>
                {cartItems.map((item) => (
                  <CartItem item={item} key={item.slug} />
                ))}
              </>
            )}
          </div>

          {/* Summary */}
          {cartItems.length !== 0 && (
            <div className="flex-[1]">
              <h3 className=" text-lg font-bold">Summary</h3>
              <div className=" p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className=" flex justify-between">
                  <h2 className="text-md md:text-lg font-medium text-black">
                    Subtotal
                  </h2>
                  <p className="text-md font-medium text-black">
                    ₹ {price.subTotal}
                  </p>
                </div>
                <div className=" flex justify-between my-2">
                  <h2 className="text-md md:text-lg font-medium text-black">
                    Discount
                  </h2>
                  <p className=" text-md font-medium text-black">
                    ₹ {price.discount || 0}
                  </p>
                </div>
                <div className=" flex justify-between border-t pt-2">
                  <h2 className="text-md md:text-xl text-black">Total</h2>
                  <p className=" text-md md:text-xl font-medium text-black">
                    ₹ {price.total || price.subTotal}
                  </p>
                </div>

                <p className=" text-sm md:text-md py-5 mt-2">
                  The subtotal reflects the total price of your order ,
                  including duties and taxes, before any applicable discounts.
                  It does not include delivery costs.
                </p>
              </div>

              {/* Coupon */}
              <h3 className=" text-lg font-bold">Coupon Code</h3>
              <p className="text-sm my-2">
                Enter a valid coupon code to apply a discount to your order.
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 my-5"
              >
                <div>
                  <input
                    type="text"
                    className={` ${
                      coupon && message
                        ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                        : "border-gray-300 focus:ring-black focus:border-black"
                    } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg p-2.5 `}
                    placeholder="Enter Coupon Code"
                    {...register("code")}
                    onChange={handleInputChange}
                  />
                  {errors.code && (
                    <p className="text-sm text-red-500 absolute">
                      {errors.code.message}
                    </p>
                  )}

                  {!errors.code && message && (
                    <p
                      className={`text-sm absolute mt-1 ${
                        coupon ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </div>
                <button
                  disabled={isSubmitting}
                  className="w-28 h-10 rounded-lg border border-black text-md transition-transform active:scale-95 font-bold uppercase gap-2 hover:opacity-75 disabled:opacity-40"
                >
                  Apply
                </button>
              </form>

              <a
                href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_RECIPIENT_PHONE_NUMBER}&text=${checkoutMessage}`}
                target="_blank"
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mt-10 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
              >
                Checkout
              </a>
            </div>
          )}
          {/* Summary End */}
        </div>
        {/* Cart Content End */}
      </Wrapper>
    </div>
  );
};

export default Cart;
