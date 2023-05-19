import Home from "@/containers/home/Home";
import BaseLayout from "@/layouts/BaseLayout";

export interface BannerDto {
  _id: string;
  subTitle: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
  displayIndex: number;
}

interface HomePageProps {
  banners: BannerDto[];
  bestSellers: any;
}

export default function HomePage({ banners, bestSellers }: HomePageProps) {
  return (
    <BaseLayout title="Home">
      <Home banners={banners} bestSellers={bestSellers} />
    </BaseLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner`);
  const resBestSellers = await fetch(
    `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/best-sellers`
  );
  const banners = await res.json();
  const bestSellers = await resBestSellers.json();
  return {
    props: { banners, bestSellers },
  };
}
