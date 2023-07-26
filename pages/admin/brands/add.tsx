import BrandForm from "@/admin/containers/brand/BrandForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const AddBrandPage = () => {
  return (
    <AdminBaseLayout title="Add Brand">
      <BrandForm />
    </AdminBaseLayout>
  );
};

export default AddBrandPage;
