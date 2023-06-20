import { BannerDto } from "@/pages";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function AllBanners() {
  const [banners, setBanners] = useState<BannerDto[] | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchBanners() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner`
      );
      const banners = await res.json();
      setBanners(banners);
      setLoading(false);
    }
    fetchBanners();
  }, []);

  const handleDelete = async (bannerId: string) => {
    const bannerDeleteToast = toast.loading("Deleting Banner...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/banner/${bannerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    if (response.ok) {
      if (banners) {
        const updatedBanners: any = banners.filter(
          (banner: BannerDto) => banner._id !== bannerId
        );
        setBanners(updatedBanners);
      }
      toast.success("Banner deleted Successfully", {
        id: bannerDeleteToast,
      });
      router.reload();
    } else {
      const errorData = await response.json();
      toast.error(errorData.message, {
        id: bannerDeleteToast,
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Banners
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the banners in stay young including their title, sub
            title, tags, image etc...
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/banners/add"
            className="block rounded-md bg-stayPurple px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:border hover:border-stayPurple hover:bg-transparent hover:text-stayPurple "
          >
            Add Banner
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
                    Position
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    subTitle
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
                  <p className="mt-6">🚀Loading Banners...Please wait </p>
                ) : (
                  banners?.map((banner: BannerDto) => (
                    <tr key={banner._id}>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {banner.displayIndex}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {banner.title}
                      </td>
                      <td className="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {banner.subTitle}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Image
                          src={banner.image}
                          alt={banner.title}
                          width={200}
                          height={200}
                          priority
                          className="w-44"
                        />
                      </td>
                      <td className="relative flex items-center md:gap-6 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3">
                        <Link
                          href={`/admin/banners/${banner._id}`}
                          className="text-gray-700 hover:text-stayPurple pr-4 mt-5  transition-all duration-200 ease-in-out"
                        >
                          <FaRegEdit size={20} />
                        </Link>

                        <MdOutlineDelete
                          onClick={() => handleDelete(banner._id)}
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
}
