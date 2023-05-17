import Home from "@/containers/home/Home";
import BaseLayout from "@/layouts/BaseLayout";

export interface BannerDto {
  _id: string;
  subTitle: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
  order: number;
}

interface HomePageProps {
  banners: BannerDto[];
}

export default function HomePage({ banners }: HomePageProps) {
  return (
    <BaseLayout title="Home">
      <Home banners={banners} />
    </BaseLayout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner`);
  const banners = await res.json();
  return {
    props: { banners },
    revalidate: 10,
  };
}
