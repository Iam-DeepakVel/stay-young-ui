import AllCategories from "@/components/AllCategories";
import Coupon from "@/components/Coupon";
import HeroBanner from "@/components/HeroBanner";
import ShowCaseProducts from "@/components/ShowCaseProducts";
import { BannerDto } from "@/pages";
import React from "react";

interface HomeProps {
  banners: BannerDto[];
}

const Home = ({ banners }: HomeProps) => {
  const sortedBanners = banners.sort((a, b) => a.order - b.order);
  return (
    <>
      <HeroBanner banners={sortedBanners} />
      <AllCategories />
      <ShowCaseProducts />
      <Coupon />
    </>
  );
};

export default Home;
