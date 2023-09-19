import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CouponDto } from "./AllCoupons";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { animateScroll as scroll } from "react-scroll";
import InputField from "@/admin/widgets/form-input/input-field";
import NumberInputField from "@/admin/widgets/form-input/number-input-field";
import { HiOutlineEye } from "react-icons/hi";
import Image from "next/image";
import { convertGoogleDriveUrlToDirect } from "@/utils/utils";

const couponFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  discountType: z.string().min(1, "discount Type is required"),
  discount: z.number().min(1, "discount is required"),
  expiry: z.coerce.date(),
  image: z.string().url().min(1, "Image is required"),
});

type CouponFormSchemaType = z.infer<typeof couponFormSchema>;

interface CouponFormProps {
  couponToEdit?: CouponDto;
}

const CouponForm = ({ couponToEdit }: CouponFormProps) => {
  const [imageUrl, setImageUrl] = useState(couponToEdit?.image);

  const handleImageUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const directUrl = convertGoogleDriveUrlToDirect(event.target.value);
    // ! write code to use directUrl to display image here
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormSchemaType>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      name: couponToEdit?.name || "",
      code: couponToEdit?.code || "",
      discountType: couponToEdit?.discountType || "",
      discount: couponToEdit?.discount || undefined,
      expiry: couponToEdit?.expiry || undefined,
      image: couponToEdit?.image || "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CouponFormSchemaType> = async (data) => {
    try {
      if (couponToEdit) {
        const editCouponToast = toast.loading("Updating Coupon...");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon/${couponToEdit._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          toast.success("Coupon Updated Successfully", {
            id: editCouponToast,
          });

          router.push("/admin/coupons");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: editCouponToast,
          });
        }
      } else {
        const addCouponToast = toast.loading("Launching Coupon...");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/coupon`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          toast.success("Coupon Added Successfully", {
            id: addCouponToast,
          });
          reset();

          scroll.scrollToTop({
            duration: 500,
            smooth: "easeInOutQuart",
          });
          setImageUrl("");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: addCouponToast,
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Coupon Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {`Enter the details of the coupon to ${
            couponToEdit ? "update" : "add"
          } it to stay young's collection.`}{" "}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <InputField
              name="name"
              type="text"
              label="Name"
              register={register}
              placeholder="Enter Coupon Name"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.name}
            />
          </div>

          <div className="sm:col-span-3">
            <InputField
              name="code"
              label="Coupon Code"
              type="text"
              register={register}
              placeholder="Enter Coupon Code Title"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.code}
            />
          </div>

          {/*Discount Type*/}
          <div className="sm:col-span-3">
            <label
              htmlFor="displayIndex"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Discount Type
            </label>
            <select
              {...register("discountType")}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-stayPurple text-sm sm:leading-6"
            >
              <option value="" selected disabled>
                Discount Type
              </option>
              <option value="percentage">Percentage</option>
              <option value="price">Flat Discount</option>
            </select>
            {errors.discountType && (
              <span className="form-error-text mt-1">
                {errors.discountType.message}
              </span>
            )}
          </div>

          <div className="sm:col-span-3">
            <NumberInputField
              name="discount"
              label="Discount"
              type="number"
              register={register}
              placeholder="Enter Discount"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.discount}
            />
          </div>

          <div className="sm:col-span-4">
            <InputField
              name="image"
              label="Image Url"
              onChange={handleImageUrlChange}
              type="text"
              register={register}
              placeholder="Enter Coupon Image Url"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.image}
            />
          </div>

          {imageUrl && (
            <div className="sm:col-span-full">
              <div className="flex items-center gap-2 mb-2 -mt-6">
                <HiOutlineEye size={20} />
                <h2>Image Preview</h2>
              </div>
              <Image
                src={imageUrl}
                alt="coupon preview"
                width={500}
                height={500}
                priority
              />
            </div>
          )}

          <div className="sm:col-span-4">
            <InputField
              name="expiry"
              label={`Expiry Date ${
                couponToEdit
                  ? `| Current Expiry(dd-mm-yyyy): ${new Date(
                      couponToEdit.expiry
                    ).getDate()}-${
                      new Date(couponToEdit.expiry).getMonth() + 1
                    }-${new Date(couponToEdit.expiry).getFullYear()} `
                  : ""
              }`}
              type="date"
              register={register}
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.expiry}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/admin/coupons"
          className="text-sm flex items-center justify-center font-semibold leading-6 text-stayPurple border border-stayPurple rounded-lg w-24 h-12 hover:bg-stayPurple hover:text-white transition-all duration-200 ease-in-out"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-sm font-semibold leading-6  bg-stayPurple text-white rounded-lg w-36 h-12  hover:bg-transparent hover:text-stayPurple hover:border hover:border-stayPurple transition-all duration-200 ease-in-out"
        >
          {isSubmitting
            ? couponToEdit
              ? "Updating..."
              : "Launching..."
            : couponToEdit
            ? "Update Coupon"
            : "Launch Coupon"}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
