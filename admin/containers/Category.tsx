import Image from "next/image";
import { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`
      );
      const categories = await res.json();
      setCategories(categories);
    }
    fetchCategories();
  }, []);
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
          <button
            type="button"
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-black hover:bg-transparent hover:text-black "
          >
            Add Category
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
                {categories?.map((category: any) => (
                  <tr key={category.name}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {category.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                      <a
                        href="#"
                        className="text-indigo-600 pr-4 hover:text-indigo-900"
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
