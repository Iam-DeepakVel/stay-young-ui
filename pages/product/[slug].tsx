import ProductDetails from "@/containers/product-details/ProductDetails";
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <BaseLayout title={slug ? slug.toString() : ""}>
      <ProductDetails />
    </BaseLayout>
  );
};

export default ProductDetailsPage;
