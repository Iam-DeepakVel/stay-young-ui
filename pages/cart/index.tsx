import Cart from "@/containers/cart/Cart";
import BaseLayout from "@/layouts/BaseLayout";
import React from "react";

const CartPage = () => {
  return (
    <BaseLayout title="Cart">
      <Cart />
    </BaseLayout>
  );
};

export default CartPage;
