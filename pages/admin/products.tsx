import Product from "@/admin/containers/Product";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const ProductsPage = () => {
  return (
    <AdminBaseLayout title="Products">
      <Product />;
    </AdminBaseLayout>
  );
};

export default ProductsPage;
