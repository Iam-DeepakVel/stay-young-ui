import Category from "@/admin/containers/Category";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const CategoriesPage = () => {
  return (
    <AdminBaseLayout title="Categories">
      <Category />;
    </AdminBaseLayout>
  );
};

export default CategoriesPage;
