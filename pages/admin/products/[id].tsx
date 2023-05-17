import ProductForm from "@/admin/containers/product/ProductForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";
import Loading from "@/common/loading/Loading";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useMemo(() => {
    if (id) {
      const fetchProductToEdit = async () => {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/${id}`
        );
        const singleProduct = await response.json();
        setProduct(singleProduct);
        setIsLoading(false);
      };
      fetchProductToEdit();
    }
  }, [id]);

  return !isLoading && product ? (
    <AdminBaseLayout title="Edit Product">
      <ProductForm productToEdit={product} />
    </AdminBaseLayout>
  ) : (
    <Loading />
  );
}
