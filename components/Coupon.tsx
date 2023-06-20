import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { CouponDto } from "@/admin/containers/coupon/AllCoupons";

const Coupon = () => {
  const [coupons, setCoupons] = useState<CouponDto[] | null>(null);

  // Fetching Coupons
  useEffect(() => {
    async function fetchCoupons() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon`
      );
      const coupons = await res.json();
      setCoupons(coupons);
    }
    fetchCoupons();
  }, []);
  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden md:block max-w-7xl w-full mx-auto mb-14">
        <div className="flex items-center justify-center w-full flex-wrap">
          {coupons?.map((coupon) => (
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
          {coupons?.map((coupon) => (
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
