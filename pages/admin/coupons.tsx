import Coupons from "@/admin/containers/Coupon";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const CouponsPage = () => {
  return (
    <AdminBaseLayout title="Coupons">
      <Coupons />;
    </AdminBaseLayout>
  );
};

export default CouponsPage;
