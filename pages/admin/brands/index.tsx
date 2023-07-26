import AllBrands from "@/admin/containers/brand/AllBrands";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const BrandsPage = () => {
  return (
    <AdminBaseLayout title="Brands">
      <AllBrands />
    </AdminBaseLayout>
  );
};

export default BrandsPage;
