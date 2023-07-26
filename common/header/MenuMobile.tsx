import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { navLinks } from "./Menu";
import { scrollToBottom } from "@/utils/utils";
import { motion } from "framer-motion";
import { CategoryDto } from "@/pages/admin/categories/[id]";
import { BrandDto } from "@/pages/admin/brands/[id]";

const MenuMobile = ({
  setMobileMenu,
  categories,
  brands,
}: {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryDto[] | null;
  brands: BrandDto[] | null;
}) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showBrandMenu, setShowBrandMenu] = useState(false);

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      variants={{
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex bg-white flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] border-t text-black"
    >
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <>
              {link.id === 2 && (
                <li
                  className="cursor-pointer  py-4 px-5 border-b flex flex-col relative "
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                >
                  <div className="flex justify-between items-center">
                    {link.name}
                    <BsChevronDown size={14} className="mt-1" />
                  </div>

                  {showCategoryMenu && (
                    <motion.ul
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      variants={{
                        hidden: { opacity: 0, x: -80 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="bg-black/[0.01] -mx-5 mt-4 -mb-4"
                    >
                      {categories?.map((category) => (
                        <Link
                          key={category._id}
                          href={`/category/${category.name.toLowerCase()}`}
                          onClick={() => {
                            setShowCategoryMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {category.name}
                          </li>
                        </Link>
                      ))}
                    </motion.ul>
                  )}
                </li>
              )}
              {link.id === 3 && (
                <li
                  className="cursor-pointer  py-4 px-5 border-b flex flex-col relative "
                  onClick={() => setShowBrandMenu(!showBrandMenu)}
                >
                  <div className="flex justify-between items-center">
                    {link.name}
                    <BsChevronDown size={14} className="mt-1" />
                  </div>

                  {showBrandMenu && (
                    <motion.ul
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      variants={{
                        hidden: { opacity: 0, x: -80 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="bg-black/[0.01] -mx-5 mt-4 -mb-4"
                    >
                      {brands?.map((brand) => (
                        <Link
                          key={brand._id}
                          href={`/brand/${brand.name.toLowerCase()}`}
                          onClick={() => {
                            setShowBrandMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {brand.name}
                          </li>
                        </Link>
                      ))}
                    </motion.ul>
                  )}
                </li>
              )}
            </>
          ) : (
            <li className="py-4 px-5 border-b">
              {link.url ? (
                <Link href={link.url!} onClick={() => setMobileMenu(false)}>
                  {link.name}
                </Link>
              ) : (
                <div
                  onClick={() => {
                    scrollToBottom();
                    setMobileMenu(false);
                  }}
                  className="cursor-pointer"
                >
                  {link.name}
                </div>
              )}
            </li>
          )}
        </React.Fragment>
      ))}
    </motion.ul>
  );
};

export default MenuMobile;
