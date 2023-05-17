import BannerForm from "@/admin/containers/banner/BannerForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";
import Loading from "@/common/loading/Loading";
import { BannerDto } from "@/pages";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function EditBannerPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<BannerDto | null>(null);

  useMemo(() => {
    if (id) {
      const fetchBannerToEdit = async () => {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner/${id}`
        );
        const singleBanner = await response.json();
        setBanner(singleBanner);
        setIsLoading(false);
      };
      fetchBannerToEdit();
    }
  }, [id]);

  return !isLoading && banner ? (
    <AdminBaseLayout title="Edit Banner">
      <BannerForm bannerToEdit={banner} />
    </AdminBaseLayout>
  ) : (
    <Loading />
  );
}
