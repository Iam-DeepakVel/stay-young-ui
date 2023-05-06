import ProductCard from "@/common/ProductCard";
import Wrapper from "@/common/Wrapper";
import React from "react";

const SingleCategory = ({ slug }: { slug?: string | string[] }) => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className=" text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className=" text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {slug ? slug.toString().toUpperCase() : ""}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-14 px-5 md:px-0 place-items-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Wrapper>
    </div>
  );
};

export default SingleCategory;
