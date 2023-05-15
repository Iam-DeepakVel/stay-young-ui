import AllCategories from "@/admin/containers/category/AllCategories";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const CategoriesPage = () => {
  return (
    <AdminBaseLayout title="Categories">
      <AllCategories />;
    </AdminBaseLayout>
  );
};

export default CategoriesPage;
