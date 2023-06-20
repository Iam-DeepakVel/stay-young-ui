import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const coupons = [
  {
    _id: "1",
    name: "50% discount coupon",
    image: "/assets/images/coupon-1.jpg",
  },
  {
    _id: "2",
    name: "100% discount coupon",
    image: "/assets/images/coupon-2.jpg",
  },
  {
    _id: "3",
    name: "100% discount coupon",
    image: "/assets/images/coupon-2.jpg",
  },
  {
    _id: "4",
    name: "100% discount coupon",
    image: "/assets/images/coupon-1.jpg",
  },
];

const Coupon = () => {
  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden md:block max-w-7xl w-full mx-auto mb-14">
        <div className="flex items-center justify-center w-full flex-wrap">
          {coupons.map((coupon) => (
            <Image
              width={500}
              height={500}
              key={coupon._id}
              src={coupon.image}
              alt={coupon.name}
              className="flex-shrink-0 mt-5 w-1/2"
            />
          ))}
        </div>
      </div>
      {/* For Mobile View */}
      <div className="w-full mb-14 md:hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          swipeable={true}
          showArrows={false}
          interval={2500}
        >
          {coupons.map((coupon) => (
            <Image
              key={coupon._id}
              width={500}
              height={500}
              src={coupon.image}
              className="h-[150px]"
              alt={coupon.name}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Coupon;
