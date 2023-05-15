import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInputField from "@/admin/widgets/form-input/password-input-field";
import SettingsWrapper from "@/admin/layout/SettingsWrapper";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import Link from "next/link";

const resetformSchema: any = z
  .object({
    currentPassword: z.string().min(6, "Current Password is required"),
    newPassword: z
      .string()
      .min(1, "New Password is required")
      .min(6, "New Password must have minimum 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ResetFormSchemaType = z.infer<typeof resetformSchema>;

const ResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormSchemaType>({
    resolver: zodResolver(resetformSchema),
  });

  const onSubmit: SubmitHandler<ResetFormSchemaType> = async (data) => {
    try {
      const resetPasswordToast = toast.loading("Changing Password...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/auth/reset-password`,
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
        toast.success("Changed Successfully", {
          id: resetPasswordToast,
        });
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, {
          id: resetPasswordToast,
        });
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };
  return (
    <SettingsWrapper>
      <div className="flex flex-col justify-center px-6 lg:px-8">
        <div className=" sm:w-full sm:max-w-sm">
          {error && <p className="text-md text-red-500 mb-4">{error}</p>}
          <h2 className="mt-10 mb-6 text-left text-2xl font-bold leading-9 text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PasswordInputField
              name="currentPassword"
              type="password"
              label="Current Password"
              register={register}
              placeholder="Enter Current password"
              error={errors.currentPassword}
            />

            <PasswordInputField
              name="newPassword"
              type="password"
              label="New Password"
              register={register}
              placeholder="Enter New password"
              error={errors.newPassword}
            />

            <PasswordInputField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              register={register}
              placeholder="Enter Confirm password"
              error={errors.confirmPassword}
            />

            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/admin/products"
                className="flex items-center justify-center w-1/4 ml-auto bg-transparent px-3 py-1.5 text-sm rounded-md font-semibold leading-6 shadow-sm hover:bg-black hover:text-white  border border-black transition-all duration-150 ease-in-out"
              >
                Cancel
              </Link>

              <button
                disabled={isSubmitting}
                className="flex w-1/4  justify-center  bg-black px-3 py-1.5 text-sm rounded-md font-semibold leading-6 text-white shadow-sm hover:bg-transparent  hover:bg-gray-800 transition-all duration-150 ease-in-out"
              >
                {isSubmitting ? "Changing..." : "Change"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SettingsWrapper>
  );
};

export default ResetPassword;
