import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function AllProducts() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product`
      );
      const products = await res.json();
      setProducts(products);
      setLoading(false);
    }
    fetchProducts();
  }, []);

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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
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
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-black hover:bg-transparent hover:text-black "
          >
            Add Product
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
                    Category
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
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.discountedPrice}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.stockAvailable}
                      </td>
                      <td className="relative flex md:gap-6 whitespace-nowrap pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="text-gray-700 hover:text-blue-500 pr-4 pt-10 transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={22} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(product._id)}
                          size={25}
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
