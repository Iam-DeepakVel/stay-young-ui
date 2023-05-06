import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const RelatedProducts = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
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
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
        autoPlaySpeed={1500}
        infinite={true}
        responsive={responsive}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Carousel>
      ;
    </div>
  );
};

export default RelatedProducts;
