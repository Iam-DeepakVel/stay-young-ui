/* eslint-disable @next/next/no-img-element */
import Wrapper from "@/common/Wrapper";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IoMdHeartEmpty } from "react-icons/io";

function ProductDetailsCarousel() {
  return (
    <div className=" text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        showThumbs={true}
        swipeable={true}
        className="productCarousel"
      >
        <img src="/assets/images/p1.jpg" alt="" />
        <img src="/assets/images/p2.jpg" alt="" />
        <img src="/assets/images/p3.jpg" alt="" />
      </Carousel>
    </div>
  );
}

const ProductDetails = () => {
  return (
    <div className=" w-full md:py-20">
      <Wrapper>
        <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* Left Section - Product Details Carousel */}
          <div className=" w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel />
          </div>

          {/* Right Section */}
          <div className=" flex-[1] py-3">
            {/* Product Title */}
            <h2 className=" text-[34px] font-semibold mb-2">Lotion</h2>
            {/* Product Subtitle */}
            <div className="text-lg font-semibold mb-5">Smooth Lotion</div>
            {/* Product Price */}
            <div className=" text-lg font-semibold">MRP : ₹ 450</div>

            {/* taxes and duties*/}
            <div className=" text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className=" text-md font-medium text-black/[0.5] mb-10">
              {`(Also includes all applicable duties)`}
            </div>

            {/* Add to Cart  */}
            <button className=" w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
              Add to Cart
            </button>

            {/* Add to WishList */}
            <button className="group w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} className="group-hover:text-red-600" />
            </button>

            <div>
              <h1 className="text-[24px] mb-4 font-bold">Product Details</h1>
              <p className=" text-md mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                ex consequuntur facilis dolor, maxime dolorem debitis voluptate
                praesentium deserunt. Eum odio commodi quae eos culpa ullam
                eligendi rerum, praesentium quo.
              </p>
              <p className=" text-md mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                ex consequuntur facilis dolor, maxime dolorem debitis voluptate
                praesentium deserunt. Eum odio commodi quae eos culpa ullam
                eligendi rerum, praesentium quo.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
