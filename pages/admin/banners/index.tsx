import AllBanners from "@/admin/containers/banner/AllBanners";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const BannersPage = () => {
  return (
    <AdminBaseLayout title="Banners">
      <AllBanners />;
    </AdminBaseLayout>
  );
};

export default BannersPage;
