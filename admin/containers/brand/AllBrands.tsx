import { BrandDto } from "@/pages/admin/brands/[id]";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const AllBrands = () => {
  const [brands, setBrands] = useState<BrandDto[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand`
        );
        const brands = await res.json();
        setBrands(brands);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  const handleDelete = async (brandId: string) => {
    const brandDeleteToast = toast.loading("Deleting Brand...");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );

    if (response.ok) {
      if (brands) {
        const updatedBrands: any = brands.filter(
          (brand: BrandDto) => brand._id !== brandId
        );
        setBrands(updatedBrands);
      }
      toast.success("Brand deleted Successfully", {
        id: brandDeleteToast,
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: brandDeleteToast,
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Brands
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the brands in stay young including their name and
            image.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/brands/add"
            className="block rounded-md bg-stayPurple px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-stayPurple hover:bg-transparent hover:text-stayPurple "
          >
            Add Brand
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
                  <p className="mt-6">🚀Loading Brands...Please wait </p>
                ) : (
                  brands?.map((brand: any) => (
                    <tr key={brand._id}>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {brand.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          width={80}
                          height={80}
                          priority
                        />
                      </td>
                      <td className="relative flex items-center md:gap-6 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/brands/${brand._id}`}
                          className="text-gray-700 hover:text-stayPurple pr-4 mt-5  transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(brand._id)}
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

export default AllBrands;
