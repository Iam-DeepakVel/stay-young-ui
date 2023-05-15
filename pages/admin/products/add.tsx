import ProductForm from "@/admin/containers/product/ProductForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const AddProductPage = () => {
  return (
    <AdminBaseLayout title="Add Product">
      <ProductForm />;
    </AdminBaseLayout>
  );
};

export default AddProductPage;
