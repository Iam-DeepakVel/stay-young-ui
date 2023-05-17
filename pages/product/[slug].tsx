import Loading from "@/common/loading/Loading";
import ProductDetails from "@/containers/product-details/ProductDetails";
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    async function fetchSingleProduct() {
      if (slug) {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/slug/${slug}`
        );
        if (res.ok) {
          const product = await res.json();
          // Check if the data is valid JSON
          if (product) {
            setProduct(product);
          }
        }
        setLoading(false);
      }
    }
    fetchSingleProduct();
  }, [slug]);

  return loading && !product ? (
    <Loading />
  ) : (
    <BaseLayout title={slug ? slug.toString() : ""}>
      <ProductDetails product={product} />
    </BaseLayout>
  );
};

export default ProductDetailsPage;
