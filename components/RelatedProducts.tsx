import React from "react";
import Carousel from "react-multi-carousel";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ relatedProducts }: any) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      <h2 className=" text-wxl font-bold mb-5 capitalize">
        You Might Also Like
      </h2>
      <Carousel
        autoPlay={true}
        ssr={true}
        containerClass="-mx-[10px] w-full"
        itemClass="px-[10px]"
        autoPlaySpeed={2500}
        infinite={true}
        responsive={responsive}
      >
        {relatedProducts?.map((product: any) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
