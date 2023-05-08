import AllCategories from "@/components/AllCategories";
import Coupon from "@/components/Coupon";
import HeroBanner from "@/components/HeroBanner";
import ShowCaseProducts from "@/components/ShowCaseProducts";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <AllCategories />
      <ShowCaseProducts />
      <Coupon />
    </>
  );
};

export default Home;
