import ProductDetails from "@/containers/product-details/ProductDetails";
import BaseLayout from "@/layouts/BaseLayout";
import data from "@/utils/data";
import { useRouter } from "next/router";

const ProductDetailsPage = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <p className="text-2xl ">Oops! Product Not Found. {slug}</p>;
  }
  return (
    <BaseLayout title={slug ? slug.toString() : ""}>
      <ProductDetails product={product} />
    </BaseLayout>
  );
};

export default ProductDetailsPage;
