import CategoryForm from "@/admin/containers/category/CategoryForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export interface CategoryDto {
  _id: string;
  name: string;
  image: string;
}

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<CategoryDto | null>(null);

  useMemo(() => {
    if (id) {
      const fetchCategoryToEdit = async () => {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category/${id}`
        );
        const singleCategory = await response.json();
        setCategory(singleCategory);
        setIsLoading(false);
      };
      fetchCategoryToEdit();
    }
  }, [id]);

  return !isLoading && category ? (
    <AdminBaseLayout title="Edit Category">
      <CategoryForm categoryToEdit={category} />
    </AdminBaseLayout>
  ) : (
    <div>Loading</div>
  );
}
