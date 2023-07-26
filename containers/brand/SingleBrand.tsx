import Loading from "@/common/loading/Loading";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/layouts/Wrapper";
import React, { useEffect, useState } from "react";

const SingleBrand = ({ slug }: { slug?: string | string[] }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    async function fetchProductsByBrand() {
      if (slug) {
        setLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/brand/${slug}`
          );
          const products = await res.json();
          setProducts(products);
        } catch (error) {
          console.log("Error Fetching Products by brand", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProductsByBrand();
  }, [slug]);

  return !loading && products ? (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className=" text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className=" text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {slug ? slug.toString().toUpperCase() : ""}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0 place-items-center">
          {products?.map((product: any) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </Wrapper>
    </div>
  ) : (
    <Loading />
  );
};

export default SingleBrand;
