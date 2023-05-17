import BannerForm from "@/admin/containers/banner/BannerForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const AddBannerPage = () => {
  return (
    <AdminBaseLayout title="Add Banner">
      <BannerForm />;
    </AdminBaseLayout>
  );
};

export default AddBannerPage;
