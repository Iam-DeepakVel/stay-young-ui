import Cart from "@/containers/cart/Cart";
import BaseLayout from "@/layouts/BaseLayout";
import dynamic from "next/dynamic";
import React from "react";

const CartPage = () => {
  return (
    <BaseLayout title="Cart">
      <Cart />
    </BaseLayout>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
