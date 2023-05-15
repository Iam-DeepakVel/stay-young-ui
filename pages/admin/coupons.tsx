import Coupons from "@/admin/containers/coupon/Coupon";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const CouponsPage = () => {
  return (
    <AdminBaseLayout title="Coupons">
      <Coupons />;
    </AdminBaseLayout>
  );
};

export default CouponsPage;
