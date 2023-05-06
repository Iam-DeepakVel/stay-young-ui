import Wrapper from "@/layouts/Wrapper";
import ProductCard from "@/components/ProductCard";
import React from "react";

const ShowCaseProducts = () => {
  return (
    <Wrapper>
      <div className="text-center  max-w-[800px] mx-auto my-[50px] md:my-[80px]">
        <h2 className=" text-[20px] md:text-[34px] mb-5 font-semibold">
          Korean Beauty Products for Every Skin Type
        </h2>
        <p className="text-md md:text-xl">
          Discover our carefully curated collection of Korean skin care products
          that are designed to provide you with healthy, glowing, and radiant
          skin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0 place-items-center">
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
  );
};

export default ShowCaseProducts;
