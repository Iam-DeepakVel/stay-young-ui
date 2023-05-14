import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/product`
      );
      const products = await res.json();
      setProducts(products);
    }
    fetchProducts();
  }, []);

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
          <button
            type="button"
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-black hover:bg-transparent hover:text-black "
          >
            Add Product
          </button>
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
                {products?.map((product: any) => (
                  <tr key={product._id} className="even:bg-gray-100">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3 flex items-center justify-between gap-4 md:gap-0">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                      <a href="#" className="text-red-600 hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
