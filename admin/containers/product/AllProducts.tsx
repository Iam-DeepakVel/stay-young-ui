import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function AllProducts() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      if (!searchQuery) {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product`
        );
        const products = await res.json();
        setProducts(products);
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchQuery]);

  // Search Products
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/search?name=${e.target.value}`
      );
      const products = await response.json();
      setProducts(products);
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    const productDeleteToast = toast.loading("Deleting Product...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    if (response.ok) {
      if (products) {
        const updatedProducts: any = products.filter(
          (product: any) => product._id !== productId
        );
        setProducts(updatedProducts);
      }
      toast.success("Product deleted Successfully", {
        id: productDeleteToast,
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: productDeleteToast,
      });
    }
  };

  const handleAddToBestSeller = async (productId: string) => {
    const bestSellerAddToast = toast.loading("Adding To BestSeller...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/best-seller/add`,
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
      toast.success("Added to BestSeller Successfully", {
        id: bestSellerAddToast,
      });
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
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in stay young including their name,
            category, price and available stock.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/products/add"
            className="block rounded-md bg-stayPurple px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-stayPurple hover:bg-transparent hover:text-stayPurple "
          >
            Add Product
          </Link>
        </div>
      </div>
      <div className="relative w-full md:w-3/4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stayPurple focus:border-stayPurple block w-full pl-10 p-2.5"
          placeholder="Search by Prouduct Name or Sub Name..."
          value={searchQuery}
          onChange={handleInputChange}
        />
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
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Brand
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    stockAvailable
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    BestSeller
                  </th>
                  <th
                    scope="col"
                    className="relative text-left py-3.5 pl-3 pr-4 sm:pr-3"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <p className="mt-6">🚀Loading Products...Please wait </p>
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
                      <td className="whitespace-nowrap capitalize px-3 py-4 text-sm text-gray-500">
                        {product.category.map((ct: any, index: number) => {
                          const isLastItem =
                            index === product.category.length - 1;
                          const separator = isLastItem ? "" : "&";

                          return (
                            <div key={ct._id}>
                              <p>{ct.name}</p>
                              {!isLastItem && <span>{separator}</span>}
                            </div>
                          );
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.brand?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.discountedPrice}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.stockAvailable}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <p
                          onClick={() => handleAddToBestSeller(product._id)}
                          className="bg-stayPurple flex items-center justify-center w-14 p-2 cursor-pointer text-white rounded-full active:scale-75 transition-all duration-200 ease-in-out"
                        >
                          Add
                        </p>
                      </td>
                      <td className="relative flex items-center justify-center  mt-8 md:gap-6  whitespace-nowrap pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="text-gray-700 hover:text-stayPurple pr-4 transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(product._id)}
                          size={22.5}
                          className="text-red-400 hover:text-gray-700  cursor-pointer transition-all duration-200 ease-in-out"
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
