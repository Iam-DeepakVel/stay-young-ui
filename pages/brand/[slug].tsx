import SingleBrand from "@/containers/brand/SingleBrand";
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

const SingleBrandPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <BaseLayout title={slug ? slug.toString() : ""}>
      <SingleBrand slug={slug} />
    </BaseLayout>
  );
};

export default SingleBrandPage;
