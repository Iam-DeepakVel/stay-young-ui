import InputField from "@/admin/widgets/form-input/input-field";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { animateScroll as scroll } from "react-scroll";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category Name is required"),
  image: z.string().min(1, "Image is required").url(),
});

type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;

const CategoryForm = ({ categoryToEdit }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: categoryToEdit?.name || "",
      image: categoryToEdit?.image || "",
    },
  });

  const onSubmit: SubmitHandler<CategoryFormSchemaType> = async (data) => {
    try {
      if (categoryToEdit) {
        const editCategoryToast = toast.loading("Updating Category...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category/${categoryToEdit._id}`,
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
          toast.success("Category Updated Successfully", {
            id: editCategoryToast,
          });
          router.push("/admin/categories");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } else {
        const addCategoryToast = toast.loading("Launching Category...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`,
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
          toast.success("Category Added Successfully", {
            id: addCategoryToast,
          });
          reset();
          scroll.scrollToTop({
            duration: 500,
            smooth: "easeInOutQuart",
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: addCategoryToast,
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
          Category Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {`Enter the details of the category to ${
            categoryToEdit ? "update" : "add"
          } it to stay young's collection.`}{" "}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <InputField
              name="name"
              type="text"
              label="Name"
              register={register}
              placeholder="Enter Category Name"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              error={errors.name}
            />
          </div>

          <div className="sm:col-span-2">
            <div className="mt-2">
              <InputField
                name="image"
                label="Image Url"
                type="text"
                register={register}
                placeholder="Enter Image Url"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                error={errors.image}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/admin/categories"
          className="text-sm flex items-center justify-center font-semibold leading-6 text-gray-900 border border-black rounded-lg w-24 h-12 hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-sm font-semibold leading-6  bg-black text-white rounded-lg w-36 h-12  hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-200 ease-in-out"
        >
          {isSubmitting
            ? categoryToEdit
              ? "Updating..."
              : "Launching..."
            : categoryToEdit
            ? "Update Category"
            : "Launch Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
