import { CouponDto } from "@/admin/containers/coupon/AllCoupons";
import CouponForm from "@/admin/containers/coupon/CouponForm";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";
import Loading from "@/common/loading/Loading";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function EditCouponPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState<CouponDto | null>(null);

  useMemo(() => {
    if (id) {
      const fetchCouponToEdit = async () => {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          }
        );
        const singleCoupon = await response.json();
        setCoupon(singleCoupon);
        setIsLoading(false);
      };
      fetchCouponToEdit();
    }
  }, [id]);

  return !isLoading && coupon ? (
    <AdminBaseLayout title="Edit Coupon">
      <CouponForm couponToEdit={coupon} />
    </AdminBaseLayout>
  ) : (
    <Loading />
  );
}
