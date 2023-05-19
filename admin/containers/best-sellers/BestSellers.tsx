import Loading from "@/common/loading/Loading";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

export default function BestSellers() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchBestSellers() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/best-sellers`
      );
      const bestSellers = await res.json();
      setProducts(bestSellers.products);
      setLoading(false);
    }
    fetchBestSellers();
  }, []);

  const handleRemoveFromBestSeller = async (productId: string) => {
    const bestSellerAddToast = toast.loading("Removing From BestSeller...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/best-seller/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({ productId }),
      }
    );
    if (response.ok) {
      toast.success("Removed Successfully", {
        id: bestSellerAddToast,
      });
      if (products) {
        const updatedProducts: any = products.filter(
          (product: any) => product._id !== productId
        );
        setProducts(updatedProducts);
      }
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: bestSellerAddToast,
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8 md:mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Best Sellers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the best seller products in stay young including their
            name, category, price and available stock.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/products"
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-black hover:bg-transparent hover:text-black "
          >
            Add Best Seller
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
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Discounted Price
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <p className="mt-6">🚀Loading Best Sellers...Please wait </p>
                ) : (
                  products?.map((product: any) => (
                    <tr key={product._id} className="even:bg-gray-100">
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14"
                          width={100}
                          height={100}
                          priority
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.discountedPrice}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="text-gray-700 hover:text-blue-500 pr-4 pt-10 transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>
                      </td>
                      <td className="whitespace-nowrap text-right capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <p
                          onClick={() =>
                            handleRemoveFromBestSeller(product._id)
                          }
                          className="bg-black flex items-center justify-center  p-2 md:w-18 md:px-0 cursor-pointer text-white rounded-full active:scale-75 transition-all duration-200 ease-in-out"
                        >
                          Remove
                        </p>
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
