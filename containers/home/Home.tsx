import AllCategories from "@/components/AllCategories";
import HeroBanner from "@/components/HeroBanner";
import ShowCaseProducts from "@/components/ShowCaseProducts";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <AllCategories />
      <ShowCaseProducts />
    </>
  );
};

export default Home;
