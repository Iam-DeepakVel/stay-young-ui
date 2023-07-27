import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export interface CouponDto {
  _id: string;
  name: string;
  code: string;
  discountType: string;
  discount: number;
  expiry: Date;
  image: string;
}

const AllCoupons = () => {
  const [coupons, setCoupons] = useState<CouponDto[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCoupons() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon`
      );
      const coupons = await res.json();
      setCoupons(coupons);
      setLoading(false);
    }
    fetchCoupons();
  }, []);

  const handleDelete = async (couponId: string) => {
    const couponDeleteToast = toast.loading("Deleting Coupon...");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon/${couponId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );

    if (response.ok) {
      if (coupons) {
        const updatedCoupons: any = coupons.filter(
          (coupon: CouponDto) => coupon._id !== couponId
        );
        setCoupons(updatedCoupons);
      }

      toast.success("Coupon deleted Successfully", {
        id: couponDeleteToast,
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: couponDeleteToast,
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Coupons
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the coupons in stay young including their name, code,
            image, expiry etc...
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/coupons/add"
            className="block rounded-md bg-stayPurple px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-stayPurple hover:bg-transparent hover:text-stayPurple "
          >
            Add Coupon
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Discount Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {`Expiry(dd-mm-yyyy)`}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="relative text-left py-3.5 pl-3 pr-4 sm:pr-3"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {loading ? (
                  <p className="mt-6">🚀Loading Coupons...Please wait </p>
                ) : (
                  coupons?.map((coupon: CouponDto) => (
                    <tr key={coupon._id}>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {coupon.name}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {coupon.code}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {coupon.discountType}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {coupon.discount}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {`${new Date(coupon.expiry).getDate()}-${
                          new Date(coupon.expiry).getMonth() + 1
                        }-${new Date(coupon.expiry).getFullYear()}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image
                          src={coupon.image}
                          alt={coupon.name}
                          width={200}
                          height={200}
                          priority
                          className="w-44"
                        />
                      </td>
                      <td className="relative flex items-center md:gap-6 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/coupons/${coupon._id}`}
                          className="text-gray-700 hover:text-stayPurple pr-4 mt-5  transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(coupon._id)}
                          size={22.5}
                          className="text-red-400 hover:text-gray-700 mt-5 cursor-pointer transition-all duration-200 ease-in-out"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoupons;
