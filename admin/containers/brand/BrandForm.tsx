import { BrandDto } from "@/pages/admin/brands/[id]";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi";
import InputField from "@/admin/widgets/form-input/input-field";
import Link from "next/link";

const brandFormSchema = z.object({
  name: z.string().min(1, "Brand Name is required"),
  image: z.string().min(1, "Image URL is required").url(),
});

type BrandFormSchemaType = z.infer<typeof brandFormSchema>;

interface BrandFormProps {
  brandToEdit?: BrandDto;
}

const BrandForm = ({ brandToEdit }: BrandFormProps) => {
  const [imageUrl, setImageUrl] = useState(brandToEdit?.image);

  const router = useRouter();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormSchemaType>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brandToEdit?.name || "",
      image: brandToEdit?.image || "",
    },
  });

  const onSubmit: SubmitHandler<BrandFormSchemaType> = async (data) => {
    try {
      if (brandToEdit) {
        const editBrandToast = toast.loading("Updating Brand...");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand/${brandToEdit._id}`,
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
          toast.success("Brand Updated Successfully", {
            id: editBrandToast,
          });
          router.push("/admin/brands");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } else {
        const addBrandToast = toast.loading("Launching Brand...");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand`,
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
          toast.success("Brand Added Successfully", {
            id: addBrandToast,
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
            id: addBrandToast,
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
          Brand Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {`Enter the details of the brand to ${
            brandToEdit ? "update" : "add"
          } it to stay young's collection.`}{" "}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <InputField
              name="name"
              type="text"
              label="Name"
              register={register}
              placeholder="Enter Brand Name"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
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
                onChange={handleImageUrlChange}
                placeholder="Enter Image Url"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image}
              />
            </div>
          </div>
          {imageUrl && (
            <div className="sm:col-span-full">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineEye size={20} />
                <h2>Image Preview</h2>
              </div>
              <Image
                src={imageUrl}
                alt="Brand Image preview"
                width={200}
                height={200}
                priority
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/admin/brands"
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
            ? brandToEdit
              ? "Updating..."
              : "Launching..."
            : brandToEdit
            ? "Update Brand"
            : "Launch Brand"}
        </button>
      </div>
    </form>
  );
};

export default BrandForm;
