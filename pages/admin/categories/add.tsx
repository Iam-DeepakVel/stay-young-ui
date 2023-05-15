import CategoryForm from "@/admin/containers/category/CategoryForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const AddCategoryPage = () => {
  return (
    <AdminBaseLayout title="Add Category">
      <CategoryForm />;
    </AdminBaseLayout>
  );
};

export default AddCategoryPage;
