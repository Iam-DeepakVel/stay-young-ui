import SingleCategory from "@/components/single-category/SingleCategory";
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "next/router";
import React from "react";

const SingleCategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <BaseLayout title={slug ? slug.toString() : ""}>
      <SingleCategory slug={slug} />
    </BaseLayout>
  );
};

export default SingleCategoryPage;
