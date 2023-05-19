import BestSellers from "@/admin/containers/best-sellers/BestSellers";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const BestSellersPage = () => {
  return (
    <AdminBaseLayout title="BestSellers">
      <BestSellers />
    </AdminBaseLayout>
  );
};

export default BestSellersPage;
