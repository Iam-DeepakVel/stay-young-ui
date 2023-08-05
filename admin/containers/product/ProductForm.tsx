import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "@/admin/widgets/form-input/input-field";
import NumberInputField from "@/admin/widgets/form-input/number-input-field";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { animateScroll as scroll } from "react-scroll";
import { HiOutlineEye } from "react-icons/hi";
import Image from "next/image";
import { MdCrueltyFree } from "react-icons/md";
import { CategoryDto } from "@/pages/admin/categories/[id]";
import { BrandDto } from "@/pages/admin/brands/[id]";
import { DETAIL_TAGS } from "@/containers/product-details/ProductDetails";

const productFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    subName: z.string().min(1, "Subname is required"),
    category: z
      .array(z.string())
      .min(1, "At least one category must be selected"),
    brand: z.string().min(1, "Brand is required"),
    crueltyContent: z.string(),
    phContent: z.string(),
    additionalInfoContent: z.string(),
    image1: z.string().min(1, "Image 1 url is required").url(),
    image2: z.string(),
    image3: z.string(),
    image4: z.string(),
    image5: z.string(),
    price: z
      .number()
      .positive("Price must be a positive number and cannot be zero."),
    discountedPrice: z
      .number()
      .positive(
        "Discounted price must be a positive number and cannot be zero"
      ),
    stockAvailable: z
      .number()
      .min(0, "Stock available must be a positive number or zero"),
    content: z.string().min(1, "Content is required"),
    ingredients: z.string().min(1, "Ingredients is required"),
    usage: z.string().min(1, "Usage is required"),
  })
  .refine((data) => data.price >= data.discountedPrice, {
    path: ["price"],
    message: "Price must be greater than or equal to discounted price",
  });

type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export default function ProductForm({ productToEdit }: any) {
  const [categories, setCategories] = useState<CategoryDto[]>();
  const [brands, setBrands] = useState<BrandDto[]>();
  const [image1Url, setImage1Url] = useState(productToEdit?.images[0]);
  const [image2Url, setImage2Url] = useState(productToEdit?.images[1]);
  const [image3Url, setImage3Url] = useState(productToEdit?.images[2]);
  const [image4Url, setImage4Url] = useState(productToEdit?.images[3]);
  const [image5Url, setImage5Url] = useState(productToEdit?.images[4]);

  const [crueltyActive, setCrueltyActive] = useState(
    productToEdit ? productToEdit.detailTags[0]?.isActive : false
  );
  const [phActive, setPhActive] = useState(
    productToEdit ? productToEdit.detailTags[1]?.isActive : false
  );
  const [additionalInfoActive, setAdditionalInfoActive] = useState(
    productToEdit ? productToEdit.detailTags[2]?.isActive : false
  );

  const router = useRouter();

  const handleImage1UrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage1Url(event.target.value);
  const handleImage2UrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage2Url(event.target.value);
  const handleImage3UrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage3Url(event.target.value);
  const handleImage4UrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage4Url(event.target.value);
  const handleImage5UrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setImage5Url(event.target.value);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: productToEdit?.name || "",
      subName: productToEdit?.subName || "",
      category: productToEdit?.category || [],
      brand: productToEdit?.brand?._id || "",
      crueltyContent: productToEdit
        ? productToEdit.detailTags[0]?.content
        : "Cruelty Free",
      phContent: productToEdit ? productToEdit.detailTags[1]?.content : "",
      additionalInfoContent: productToEdit
        ? productToEdit.detailTags[2]?.content
        : "Artificial coloring-free + Artificial fragrance-free + Essential oil free",
      image1: productToEdit?.images[0] || "",
      image2: productToEdit?.images[1] || "",
      image3: productToEdit?.images[2] || "",
      image4: productToEdit?.images[3] || "",
      image5: productToEdit?.images[4] || "",
      price: productToEdit?.price || "",
      discountedPrice: productToEdit?.discountedPrice || "",
      stockAvailable: productToEdit?.stockAvailable || "",
      content: productToEdit?.description.content || "",
      ingredients: productToEdit?.description.ingredients || "",
      usage: productToEdit?.description.usage || "",
    },
  });

  async function fetchCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`
      );
      const categories = await res.json();
      setCategories(categories);
    } catch (error) {
      console.log("Error Fetching Categories", error);
    }
  }
  async function fetchBrands() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand`
      );
      setBrands(await res.json());
    } catch (error) {
      console.log("Error Fetching Brands", error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const onSubmit: SubmitHandler<ProductFormSchemaType> = async (data) => {
    const {
      image1,
      image2,
      image3,
      image4,
      image5,
      crueltyContent,
      phContent,
      additionalInfoContent,
      content,
      ingredients,
      usage,
      ...rest
    } = data;

    const images = [image1];

    if (image2) {
      images.push(image2);
    }

    if (image3) {
      images.push(image3);
    }

    if (image4) {
      images.push(image4);
    }

    if (image5) {
      images.push(image5);
    }

    const detailTags = [
      {
        isActive: crueltyActive,
        name: DETAIL_TAGS.CRUELTY_FREE,
        content: crueltyContent,
      },
      {
        isActive: phActive,
        name: DETAIL_TAGS.PH_RANGE,
        content: phContent,
      },
      {
        isActive: additionalInfoActive,
        name: DETAIL_TAGS.ADDITIONAL_INFO,
        content: additionalInfoContent,
      },
    ];

    const modifiedData = {
      ...rest,
      description: {
        content,
        ingredients,
        usage,
      },
      detailTags,
      images,
    };

    try {
      if (productToEdit) {
        const editProductToast = toast.loading("Updating Product...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/${productToEdit._id}`,
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
          toast.success("Product Updated Successfully", {
            id: editProductToast,
          });
          router.push("/admin/products");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: editProductToast,
          });
        }
      } else {
        const addProductToast = toast.loading("Launching Product...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product`,
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
          toast.success("Product Added Successfully", {
            id: addProductToast,
          });
          reset();
          scroll.scrollToTop({
            duration: 500,
            smooth: "easeInOutQuart",
          });
          setImage1Url("");
          setImage2Url("");
          setImage3Url("");
          setImage4Url("");
          setImage5Url("");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message, {
            id: addProductToast,
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
          Product Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {`Enter the details of the product to ${
            productToEdit ? "update" : "add"
          } it to stay young's collection.`}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Name */}
          <div className="sm:col-span-2">
            <InputField
              name="name"
              type="text"
              label="Name"
              register={register}
              placeholder="Enter Product Name"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.name}
            />
          </div>

          {/* Subname */}
          <div className=" sm:col-span-2">
            <InputField
              name="subName"
              type="text"
              label="Subname"
              register={register}
              placeholder="Enter Product Subname"
              className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.subName}
            />
          </div>

          {/* Category */}
          <div className="sm:col-span-full">
            <h2 className="form-label mb-3">Select Category</h2>
            <div className="flex gap-6">
              {categories?.map((category: any) => (
                <div key={category._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mr-3 rounded border-gray-300 text-stayPurple focus:ring-stayPurple"
                    value={category._id}
                    {...register("category")}
                    onChange={(e) => {
                      const { checked } = e.target;
                      const categoryValue = category._id;
                      const currentCategoryValues = getValues("category") || [];

                      if (checked) {
                        setValue("category", [
                          ...currentCategoryValues,
                          categoryValue,
                        ]);
                      } else {
                        setValue(
                          "category",
                          currentCategoryValues.filter(
                            (c: string) => c !== categoryValue
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={category.name} className="capitalize text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs ">{errors.category.message}</p>
            )}
          </div>

          {/* Brands */}
          <div className="sm:col-span-2">
            <label
              htmlFor="brand"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Choose Brand
            </label>
            <select
              {...register("brand")}
              defaultValue={productToEdit?.brand?._id}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-stayPurple sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                Choose Brand
              </option>
              {brands?.map((brand) => (
                <option
                  key={brand._id}
                  value={brand._id}
                  selected={productToEdit?.brand?._id === brand._id}
                  className="capitalize"
                >
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="form-error-text mt-1">
                {errors.brand.message}
              </span>
            )}
          </div>

          {/* Detail Tags */}
          <div className="sm:col-span-full">
            <h2 className="form-label mb-3">Product Detail Tags</h2>
            {/* Tags Container */}
            <div className="flex flex-wrap gap-6">
              {/* Ph */}
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={phActive}
                  onChange={(e) => setPhActive(e.target.checked)}
                />
                <div
                  className={`group flex h-12 w-12 items-center justify-center rounded-full border ${
                    phActive ? "opacity-75" : "opacity-100"
                  }`}
                >
                  <p className="text-lg">
                    p<span>H</span>{" "}
                  </p>
                </div>
                {phActive && (
                  <InputField
                    name="phContent"
                    type="text"
                    register={register}
                    placeholder="Enter the content"
                    className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                    error={errors.phContent}
                  />
                )}
                {errors.phContent && (
                  <p className="text-red-500 text-xs ">
                    {errors.phContent.message}
                  </p>
                )}
              </div>
              {/* Cruelty Free */}
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={crueltyActive}
                  onChange={(e) => setCrueltyActive(e.target.checked)}
                />
                <div
                  className={`group flex h-12 w-12 items-center justify-center rounded-full border ${
                    crueltyActive ? "opacity-75" : "opacity-100"
                  }`}
                >
                  <MdCrueltyFree
                    size={26}
                    className={`text-gray-700 ${
                      crueltyActive ? "group-hover:opacity-75" : ""
                    }`}
                  />
                </div>
                {crueltyActive && (
                  <InputField
                    name="crueltyContent"
                    type="text"
                    register={register}
                    placeholder="Enter the content"
                    className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                    error={errors.crueltyContent}
                  />
                )}
                {errors.crueltyContent && (
                  <p className="text-red-500 text-xs ">
                    {errors.crueltyContent.message}
                  </p>
                )}
              </div>
              {/* Additional Info */}
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={additionalInfoActive}
                  onChange={(e) => setAdditionalInfoActive(e.target.checked)}
                />
                <div
                  className={`group flex h-12 w-12 items-center justify-center rounded-full border ${
                    additionalInfoActive ? "opacity-75" : "opacity-100"
                  }`}
                >
                  <p className="text-lg">+</p>
                </div>

                {additionalInfoActive && (
                  <InputField
                    name="additionalInfoContent"
                    type="text"
                    register={register}
                    placeholder="Enter the content"
                    className="block w-full mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                    error={errors.additionalInfoContent}
                  />
                )}

                {errors.additionalInfoContent && (
                  <p className="text-red-500 text-xs ">
                    {errors.additionalInfoContent.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Images
            </label>
            <div className="mt-2">
              <InputField
                name="image1"
                type="text"
                register={register}
                onChange={handleImage1UrlChange}
                placeholder="Enter Image 1"
                className="block w-full flex-1 mt-3 rounded-md border-0 placeholder:text-sm py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image1}
              />
            </div>
            {image1Url && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineEye size={20} />
                  <h2>Image 1 Preview</h2>
                </div>
                <Image
                  src={image1Url}
                  alt="banner preview"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            )}
            <div className="mt-2">
              <InputField
                name="image2"
                type="text"
                register={register}
                onChange={handleImage2UrlChange}
                placeholder="Enter Image 2"
                className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image2}
              />
            </div>
            {image2Url && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineEye size={20} />
                  <h2>Image 2 Preview</h2>
                </div>
                <Image
                  src={image2Url}
                  alt="banner preview"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            )}
            <div className="mt-2">
              <InputField
                name="image3"
                type="text"
                register={register}
                onChange={handleImage3UrlChange}
                placeholder="Enter Image 3"
                className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image3}
              />
            </div>
            {image3Url && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineEye size={20} />
                  <h2>Image 3 Preview</h2>
                </div>
                <Image
                  src={image3Url}
                  alt="banner preview"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            )}
            <div className="mt-2">
              <InputField
                name="image4"
                type="text"
                register={register}
                onChange={handleImage4UrlChange}
                placeholder="Enter Image 4"
                className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image4}
              />
            </div>
            {image4Url && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineEye size={20} />
                  <h2>Image 4 Preview</h2>
                </div>
                <Image
                  src={image4Url}
                  alt="banner preview"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            )}
            <div className="mt-2">
              <InputField
                name="image5"
                type="text"
                register={register}
                onChange={handleImage5UrlChange}
                placeholder="Enter Image 5"
                className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                error={errors.image5}
              />
            </div>
            {image5Url && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineEye size={20} />
                  <h2>Image 5 Preview</h2>
                </div>
                <Image
                  src={image5Url}
                  alt="banner preview"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            )}
          </div>

          {/* Discounted Price */}
          <div className="sm:col-span-2 sm:col-start-1">
            <NumberInputField
              name="discountedPrice"
              type="number"
              label="Discounted Price"
              register={register}
              placeholder="Enter Discounted Price"
              className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.discountedPrice}
            />
          </div>

          {/* Actual Price */}
          <div className="sm:col-span-2">
            <NumberInputField
              name="price"
              type="number"
              label="Price"
              register={register}
              placeholder="Enter Price"
              className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.price}
            />
          </div>

          {/* Stock available */}
          <div className="sm:col-span-2">
            <NumberInputField
              name="stockAvailable"
              type="number"
              label="Stock Available"
              register={register}
              placeholder="Enter Stock Available"
              className="block w-full mt-3 rounded-md border-0 py-1.5 placeholder:text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
              error={errors.stockAvailable}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-4 space-y-4">
            <h2>Description</h2>
            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                  defaultValue={""}
                  {...register("content")}
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-xs ">
                  {errors.content.message}
                </p>
              )}
            </div>
            {/* Ingredients */}
            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ingredients
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                  defaultValue={""}
                  {...register("ingredients")}
                />
              </div>
              {errors.ingredients && (
                <p className="text-red-500 text-xs ">
                  {errors.ingredients.message}
                </p>
              )}
            </div>
            {/* Usage */}
            <div>
              <label
                htmlFor="usage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usage
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stayPurple sm:text-sm sm:leading-6"
                  defaultValue={""}
                  {...register("usage")}
                />
              </div>
              {errors.usage && (
                <p className="text-red-500 text-xs ">{errors.usage.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Action Buttons  */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/admin/products"
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
            ? productToEdit
              ? "Updating..."
              : "Launching..."
            : productToEdit
            ? "Update Product"
            : "Launch Product"}
        </button>
      </div>
    </form>
  );
}
