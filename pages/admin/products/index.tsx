import AllProducts from "@/admin/containers/product/AllProducts";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const ProductsPage = () => {
  return (
    <AdminBaseLayout title="Products">
      <AllProducts />;
    </AdminBaseLayout>
  );
};

export default ProductsPage;
