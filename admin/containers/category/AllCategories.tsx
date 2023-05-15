import { CategoryDto } from "@/pages/admin/categories/[id]";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function AllCategories() {
  const [categories, setCategories] = useState<CategoryDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`
      );
      const categories = await res.json();
      setCategories(categories);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId: string) => {
    const categoryDeleteToast = toast.loading("Deleting Category...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    if (response.ok) {
      if (categories) {
        const updatedCategorries: any = categories.filter(
          (category: CategoryDto) => category._id !== categoryId
        );
        setCategories(updatedCategorries);
      }
      toast.success("Category deleted Successfully", {
        id: categoryDeleteToast,
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: categoryDeleteToast,
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Categories
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the categories in stay young including their name and
            image.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/categories/add"
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-black hover:bg-transparent hover:text-black "
          >
            Add Category
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
                  <p className="mt-6">🚀Loading Categories...Please wait </p>
                ) : (
                  categories?.map((category: any) => (
                    <tr key={category.name}>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {category.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={100}
                          height={100}
                          priority
                        />
                      </td>
                      <td className="relative flex items-center md:gap-6 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/categories/${category._id}`}
                          className="text-gray-700 hover:text-blue-500 pr-4 pt-10  transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(category._id)}
                          size={22.5}
                          className="text-red-400 hover:text-gray-700 mt-10 cursor-pointer transition-all duration-200 ease-in-out"
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
}
