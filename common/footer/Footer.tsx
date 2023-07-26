import Image from "next/image";
import { AiOutlineInstagram, AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CategoryDto } from "@/pages/admin/categories/[id]";

const navigation = {
  informations: [
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Help", href: "#" },
  ],
};

export default function Footer() {
  const [categories, setCategories] = useState<CategoryDto[]>();

  async function fetchCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`
      );
      const allCategories = await res.json();
      setCategories(allCategories.slice(0, 5));
    } catch (error) {
      console.log("Error Fetching Categories", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer className="bg-white border-t border-gray-900/20">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-8 lg:px-0 lg:pt-4">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-2">
            <div className="flex -ml-2">
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
            </div>
            <p className="text-sm leading-6 text-gray-600">
              Stay Young is your one-stop destination for Korean skincare
              products that cater to your every need. Our range of products is
              specially curated to help you achieve and maintain youthful,
              glowing skin that looks and feels amazing.Say goodbye to dull,
              tired skin and hello to radiant, youthful skin with Stay Young.
            </p>
            <p className="text-sm pt-4 md:pb-2">
              Follow us on our Social Media Channels to know more about us.
            </p>
            <div className="flex space-x-6">
              <ul className="flex gap-6 mt-4">
                <motion.li whileHover={{ y: -4 }}>
                  <a
                    href="tel:+919734567890"
                    rel="noreferrer"
                    target="_blank"
                    className=""
                  >
                    <AiOutlinePhone size={20} />
                  </a>
                </motion.li>

                <motion.li whileHover={{ y: -4 }}>
                  <a
                    href="mailto:stayyoungofficial@mailinator.com"
                    rel="noreferrer"
                    target="_blank"
                    className=""
                  >
                    <BiMailSend size={20} />
                  </a>
                </motion.li>

                <motion.li whileHover={{ y: -4 }}>
                  <a
                    href="https://wa.me/+919734567890"
                    rel="noreferrer"
                    target="_blank"
                    className=""
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </motion.li>

                <motion.li whileHover={{ y: -4 }}>
                  <a href="/" rel="noreferrer" target="_blank" className="">
                    <AiOutlineInstagram size={20} />
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>

          <div className="pt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Categories
                </h3>
                <ul role="list" className="mt-2 md:mt-6 space-y-2 md:space-y-4">
                  {categories?.map((item) => (
                    <li key={item.name}>
                      <a
                        href={`/category/${item.name.toLowerCase()}`}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 capitalize"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Informations
                </h3>
                <ul role="list" className="mt-2 md:mt-6 space-y-2 md:space-y-4">
                  {navigation.informations.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid-cols- md:grid md:grid-cols-2 md:gap-8">
              <div className="md:mt-0">
                <h3 className="text-sm font-semibold mb-2 md:mb-6 leading-6 text-gray-900">
                  Contact
                </h3>
                <ul className="mt-2 space-y-4">
                  <li>
                    <h2 className="text-xs tracking-wide pb-1 uppercase">
                      Call us
                    </h2>
                    <a
                      href="tel:+919734567890"
                      className="block text-sm font-medium hover:opacity-75 sm:text-md"
                    >
                      {`+91 9734567890`}
                    </a>
                    <a
                      href="tel:+9173423423422"
                      className="block text-sm mb-3 font-medium hover:opacity-75 sm:text-md"
                    >
                      {`+91 7342342342`}
                    </a>
                  </li>
                  <p>
                    <span className="text-xs tracking-wide uppercase">
                      Mail to
                    </span>
                    <a
                      href="mailto:stayyoungofficial@mailinator.com"
                      className="block text-sm font-medium hover:opacity-75 sm:text-md"
                    >
                      stayyoungofficial@mailinator.com
                    </a>
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t flex items-center justify-between border-gray-900/10 pt-4">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Stay Young. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-gray-500 group">
            Made with ❤️ by{" "}
            <a
              href="https://jaga.live/"
              target="_blank"
              className="group-hover:text-blue-800"
            >
              LiveApps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
