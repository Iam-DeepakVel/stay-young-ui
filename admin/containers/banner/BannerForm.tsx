import InputField from "@/admin/widgets/form-input/input-field";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { animateScroll as scroll } from "react-scroll";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi";

const bannerFormSchema = z.object({
  subTitle: z.string().min(1, "Sub Title is required"),
  title: z.string().min(1, "Title is required"),
  tag1: z.string().min(1, "Tag 1 is required"),
  tag2: z.string(),
  tag3: z.string(),
  image: z.string().url().min(1, "Image is required"),
  link: z.string().url().min(1, "Link is required"),
  displayIndex: z.number().int().min(1, "Position is required"),
});

type BannerFormSchemaType = z.infer<typeof bannerFormSchema>;

const BannerForm = ({ bannerToEdit }: any) => {
  const [imageUrl, setImageUrl] = useState(bannerToEdit?.image);

  const handleImageUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormSchemaType>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      subTitle: bannerToEdit?.subTitle || "",
      title: bannerToEdit?.title || "",
      tag1: bannerToEdit?.tags[0] || "",
      tag2: bannerToEdit?.tags[1] || "",
      tag3: bannerToEdit?.tags[2] || "",
      image: bannerToEdit?.image || "",
      link: bannerToEdit?.link || "",
      displayIndex: bannerToEdit?.displayIndex || "",
    },
  });

  const onSubmit: SubmitHandler<BannerFormSchemaType> = async (data) => {
    const { tag1, tag2, tag3, ...rest } = data;

    const tags = [tag1];

    if (tag2) {
      tags.push(tag2);
    }

    if (tag3) {
      tags.push(tag3);
    }

    const modifiedData = {
      ...rest,
      tags,
    };

    try {
      if (bannerToEdit) {
        const editBannerToast = toast.loading("Updating Banner...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner/${bannerToEdit._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify(modifiedData),
          }
        );
        if (response.ok) {
          toast.success("Banner Updated Successfully", {
            id: editBannerToast,
          });
          router.push("/admin/banners");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } else {
        const addBannerToast = toast.loading("Launching Banner...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify(modifiedData),
          }
        );
        if (response.ok) {
          toast.success("Banner Added Successfully", {
            id: addBannerToast,
          });
          reset();
          scroll.scrollToTop({
            duration: 500,
            smooth: "easeInOutQuart",
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: addBannerToast,
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
          Banner Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {`Enter the details of the banner to ${
            bannerToEdit ? "update" : "add"
          } it to stay young's collection.`}{" "}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="displayIndex"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Choose Position
            </label>
            <select
              {...register("displayIndex", {
                setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
              })}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" selected disabled>
                Choose Position
              </option>
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Three</option>
              <option value="4">Fourth</option>
              <option value="5">Fifth</option>
            </select>
            {errors.displayIndex && (
              <span className="form-error-text mt-1">
                {errors.displayIndex.message}
              </span>
            )}
          </div>
          <div className="sm:col-span-2">
            <InputField
              name="subTitle"
              type="text"
              label="Sub Title"
              register={register}
              placeholder="Enter Banner Sub Title"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              error={errors.subTitle}
            />
          </div>

          <div className="sm:col-span-4">
            <InputField
              name="title"
              label="Title Url"
              type="text"
              register={register}
              placeholder="Enter Title"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              error={errors.title}
            />
          </div>

          {/*Tags  */}
          <div className="flex flex-col gap-4 sm:flex-row w-full  sm:col-span-full sm:gap-8">
            <div className="sm:col-span-1">
              <InputField
                name="tag1"
                label="Tag 1"
                type="text"
                register={register}
                placeholder="Enter Tag 1"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                error={errors.tag1}
              />
            </div>
            <div className="sm:col-span-1">
              <InputField
                name="tag2"
                label="Tag 2"
                type="text"
                register={register}
                placeholder="Enter Tag 2"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                error={errors.tag2}
              />
            </div>
            <div className="sm:col-span-1">
              <InputField
                name="tag3"
                label="Tag 3"
                type="text"
                register={register}
                placeholder="Enter Tag 3"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                error={errors.tag3}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <InputField
              name="image"
              label="Image Url"
              onChange={handleImageUrlChange}
              type="text"
              register={register}
              placeholder="Enter Image Url"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
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
                alt="banner preview"
                width={2000}
                height={200}
                priority
              />
            </div>
          )}

          <div className="sm:col-span-4">
            <InputField
              name="link"
              label="Redirect Link"
              type="text"
              register={register}
              placeholder="Enter Redirect link"
              className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              error={errors.link}
            />
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
            ? bannerToEdit
              ? "Updating..."
              : "Launching..."
            : bannerToEdit
            ? "Update Banner"
            : "Launch Banner"}
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
