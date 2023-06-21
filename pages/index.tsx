import Home from "@/containers/home/Home";
import BaseLayout from "@/layouts/BaseLayout";
import { useEffect, useState } from "react";

export interface BannerDto {
  _id: string;
  subTitle: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
  displayIndex: number;
}

export default function HomePage() {
  const [banners, setBanners] = useState<BannerDto[]>([]);
  const [bestSellers, setBestSellers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner`
      );
      const resBestSellers = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/best-sellers`
      );

      setBanners(await res.json());
      setBestSellers(await resBestSellers.json());
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    !loading &&
    banners &&
    bestSellers && (
      <BaseLayout title="Home">
        <Home banners={banners} bestSellers={bestSellers} />
      </BaseLayout>
    )
  );
}
