import CouponForm from "@/admin/containers/coupon/CouponForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const AddCouponPage = () => {
  return (
    <AdminBaseLayout title="Add Coupon">
      <CouponForm />;
    </AdminBaseLayout>
  );
};

export default AddCouponPage;
