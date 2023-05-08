import ProductCard from "@/components/ProductCard";
import Wrapper from "@/layouts/Wrapper";
import data from "@/utils/data";
import React from "react";

const SingleCategory = ({ slug }: { slug?: string | string[] }) => {
  const products = data.products.filter(
    (product) => product.category.toLowerCase() === slug?.toString()
  );
  console.log("Products", products);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className=" text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className=" text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {slug ? slug.toString().toUpperCase() : ""}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0 place-items-center">
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default SingleCategory;
