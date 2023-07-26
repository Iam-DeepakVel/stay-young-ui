import BrandForm from "@/admin/containers/brand/BrandForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";
import { Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export interface BrandDto {
  _id: string;
  name: string;
  image: string;
}

export default function EditBrandPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState<BrandDto>();

  useMemo(() => {
    if (id) {
      const fetchBrandToEdit = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand/${id}`
          );
          const singleBrand = await res.json();
          setBrand(singleBrand);
        } catch (error) {
          console.log("Error", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBrandToEdit();
    }
  }, [id]);

  return !isLoading && brand ? (
    <AdminBaseLayout title="Edit Brand">
      <BrandForm brandToEdit={brand} />
    </AdminBaseLayout>
  ) : (
    <Loading />
  );
}
