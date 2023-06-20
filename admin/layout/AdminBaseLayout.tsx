import { Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ListBulletIcon,
  ArrowLeftOnRectangleIcon,
  TagIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Loading from "@/common/loading/Loading";

const navigation = [
  { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: ListBulletIcon,
  },
  { name: "Coupons", href: "/admin/coupons", icon: TagIcon },
];

const personalization = [
  {
    name: "Banners",
    href: "/admin/banners",
    initial: "B",
  },
  {
    name: "Best Sellers",
    href: "/admin/best-sellers",
    initial: "BS",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface BaseLayoutProps {
  children?: ReactNode;
  title: string;
}

export default function AdminBaseLayout({ children, title }: BaseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/admin");
  };

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Admin StayYoung` : "Admin StayYoung"}
        </title>
        <meta
          name="description"
          content="Stay Young is a korean skin care website."
        />
      </Head>
      {user && (
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                      <div className="flex h-16 shrink-0 items-center">
                        {/* Logo */}
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.5 }}
                          variants={{
                            hidden: { opacity: 0, x: -80 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link href="/" className="flex">
                            <Image
                              width={500}
                              height={500}
                              src="/assets/images/logo-text.png"
                              className="w-24 h-10 -mr-1 md:w-32 md:h-12 md:mt-5 md:-mr-2"
                              alt="stayyoung-logo"
                            />
                            <Image
                              width={500}
                              height={500}
                              src="/assets/images/logo-img.png"
                              className="w-8 h-8 -mt-2 md:w-10 md:h-10 md:mt-3"
                              alt="stayyoung-logo"
                            />
                          </Link>
                        </motion.div>
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul
                          role="list"
                          className="flex flex-1 flex-col gap-y-7"
                        >
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={`
                                      ${
                                        router.pathname.includes(item.href)
                                          ? "bg-stayPurple text-white"
                                          : "text-gray-700 hover:text-white hover:bg-stayPurple"
                                      }
                                       group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                    `}
                                  >
                                    <item.icon
                                      className={classNames(
                                        router.pathname.includes(item.href)
                                          ? "text-white"
                                          : "text-gray-400 group-hover:text-white",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                              Personalization
                            </div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                              {personalization.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      router.pathname.includes(item.href)
                                        ? "bg-stayPurple text-white"
                                        : "text-gray-700 hover:text-white hover:bg-stayPurple",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <span
                                      className={classNames(
                                        router.pathname.includes(item.href)
                                          ? "text-white border-white"
                                          : "text-gray-700 border-black group-hover:border-white group-hover:text-white",
                                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium"
                                      )}
                                    >
                                      {item.initial}
                                    </span>
                                    <span className="truncate">
                                      {item.name}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li className="mt-auto">
                            <button
                              onClick={handleLogout}
                              className="group cursor-pointer w-full -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-stayPurple hover:text-white"
                            >
                              <ArrowLeftOnRectangleIcon
                                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white"
                                aria-hidden="true"
                              />
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                {/* Logo */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: -80 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href="/admin/products" className="flex">
                    <Image
                      width={500}
                      height={500}
                      src="/assets/images/logo-text.png"
                      className="w-24 h-10 -mr-1 md:w-32 md:h-12 md:mt-5 md:-mr-2"
                      alt="stayyoung-logo"
                    />
                    <Image
                      width={500}
                      height={500}
                      src="/assets/images/logo-img.png"
                      className="w-8 h-8 -mt-2 md:w-10 md:h-10 md:mt-3"
                      alt="stayyoung-logo"
                    />
                  </Link>
                </motion.div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              router.pathname.includes(item.href)
                                ? "bg-stayPurple text-white"
                                : "text-gray-700 hover:text-white hover:bg-stayPurple",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                router.pathname.includes(item.href)
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">
                      Personalization
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {personalization.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              router.pathname.includes(item.href)
                                ? "bg-stayPurple text-white"
                                : "text-gray-700 hover:text-white hover:bg-stayPurple",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <span
                              className={classNames(
                                router.pathname.includes(item.href)
                                  ? "text-white border-white"
                                  : "text-gray-700 border-black group-hover:border-white group-hover:text-white ",
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium"
                              )}
                            >
                              {item.initial}
                            </span>
                            <span className="truncate">{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <button
                      onClick={handleLogout}
                      className="group cursor-pointer w-full -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-stayPurple hover:text-white"
                    >
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white"
                        aria-hidden="true"
                      />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center ml-auto gap-x-4 lg:gap-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="/assets/images/logo-img.png"
                        alt="stay young logo"
                        width={200}
                        height={200}
                      />
                      <span className="flex items-center">
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          {user.name}
                        </span>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Link
                          href="/admin/settings/reset-password"
                          className="block px-3 text-sm leading-6 text-gray-900 hover:bg-gray-100 w-full py-2 text-left"
                        >
                          Reset Password
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-3 text-sm leading-6 text-gray-900 hover:bg-gray-100 w-full py-2 text-left"
                        >
                          Sign Out
                        </button>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className="py-10">
              <div className="px-4 sm:px-6">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
