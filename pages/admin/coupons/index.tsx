import Coupons from "@/admin/containers/coupon/AllCoupons";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const CouponsPage = () => {
  return (
    <AdminBaseLayout title="Coupons">
      <Coupons />
    </AdminBaseLayout>
  );
};

export default CouponsPage;
