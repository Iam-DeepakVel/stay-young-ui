import Wrapper from "@/layouts/Wrapper";
import ProductCard from "@/components/ProductCard";
import React from "react";
import data from "@/utils/data";
import { getHighestDiscountProducts } from "@/utils/utils";

const ShowCaseProducts = () => {
  const highestDiscountProducts = getHighestDiscountProducts(data.products);
  return (
    <Wrapper>
      <div className="max-w-7xl text-center my-[50px] md:my-[80px]">
        <h2 className=" text-[20px] md:text-[34px] mb-5 font-semibold">
          BEST SELLER
        </h2>
        <p className="text-md md:text-xl md:w-3/4 md:mx-auto">
          Discover our carefully curated collection of Korean skin care products
          that are designed to provide you with healthy, glowing, and radiant
          skin.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-14  md:px-0 place-items-center">
        {highestDiscountProducts.map((product: any) => (
          <ProductCard
            product={product}
            key={product.slug}
            productsLength={highestDiscountProducts.length}
            showBestSellerTag={true}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default ShowCaseProducts;
