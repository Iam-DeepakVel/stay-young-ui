import CartItem from "@/components/CartItem";
import Wrapper from "@/layouts/Wrapper";
import { StoreContext } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Cart = () => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;
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
          <div className="flex-[1]">
            <h3 className=" text-lg font-bold">Summary</h3>
            <div className=" p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className=" flex justify-between">
                <h2 className=" uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </h2>
                <p className=" text-md md:text-lg font-medium text-black">
                  ₹{" "}
                  {cartItems.reduce(
                    (a, c) => a + c.quantity * c.discountedPrice,
                    0
                  )}
                </p>
              </div>
              <p className=" text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order , including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs.
              </p>
            </div>

            {/* Checkout Button */}
            <a
              href="https://wa.me/+919734567890"
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
            >
              Checkout
            </a>
            {/* Checkout Button */}
          </div>
          {/* Summary End */}
        </div>
        {/* Cart Content End */}
      </Wrapper>
    </div>
  );
};

export default Cart;
