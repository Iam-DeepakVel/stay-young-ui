import { BrandDto } from "@/pages/admin/brands/[id]";
import { CategoryDto } from "@/pages/admin/categories/[id]";
import { scrollToBottom } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export const navLinks = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "View Products",
    url: "/category",
    subMenu: true,
  },
  {
    id: 3,
    name: "View Brands",
    url: "/brand",
    subMenu: true,
  },
  { id: 4, name: "Contact" },
];

const Menu = ({
  categories,
  brands,
}: {
  categories: CategoryDto[] | null;
  brands: BrandDto[] | null;
}) => {
  const { asPath } = useRouter();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showBrandMenu, setShowBrandMenu] = useState(false);
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <>
              {/* For Categories */}
              {link.id === 2 && (
                <li
                  className={`cursor-pointer ${
                    asPath.includes(link.url) && "font-extrabold"
                  } flex items-center gap-2 relative`}
                  onMouseEnter={() => setShowCategoryMenu(true)}
                  onMouseLeave={() => setShowCategoryMenu(false)}
                >
                  {link.name}
                  <BsChevronDown size={14} className="mt-1" />
                  {/* Categories dropdown */}
                  {showCategoryMenu && (
                    <ul className="bg-white/95 absolute top-6 left-0 min-w-[250px]  text-black shadow-lg rounded-lg">
                      {categories?.map((category) => (
                        <Link
                          key={category._id}
                          href={`/category/${category.name.toLowerCase()}`}
                          onClick={() => setShowCategoryMenu(false)}
                        >
                          <li
                            className={`${
                              asPath === category.name.toLowerCase() &&
                              "bg-[#28282B] text-white"
                            } h-12 flex items-center px-4 py-2 hover:bg-[#28282B] hover:text-white hover:scale-110 rounded-md`}
                          >
                            {category.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              )}
              {/* For Brands */}
              {link.id === 3 && (
                <li
                  className={`cursor-pointer ${
                    asPath.includes(link.url) && "font-extrabold"
                  } flex items-center gap-2 relative`}
                  onMouseEnter={() => setShowBrandMenu(true)}
                  onMouseLeave={() => setShowBrandMenu(false)}
                >
                  {link.name}
                  <BsChevronDown size={14} className="mt-1" />
                  {/* Brands dropdown */}
                  {showBrandMenu && (
                    <ul className="bg-white/95 absolute top-6 left-0 min-w-[250px]  text-black shadow-lg rounded-lg">
                      {brands?.map((brand) => (
                        <Link
                          key={brand._id}
                          href={`/brand/${brand.name.toLowerCase()}`}
                          onClick={() => setShowBrandMenu(false)}
                        >
                          <li
                            className={`${
                              asPath === brand.name.toLowerCase() &&
                              "bg-[#28282B] text-white"
                            } h-12 flex items-center px-4 py-2 hover:bg-[#28282B] hover:text-white hover:scale-110 rounded-md`}
                          >
                            {brand.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </>
          ) : (
            <li className="cursor-pointer">
              {link.url ? (
                // For Home
                <Link
                  href={link.url!}
                  className={`${
                    asPath === link.url && ""
                  } group transition duration-300 cursor-pointer`}
                >
                  {link.name}
                  <span
                    className={`${
                      asPath === link.url && "max-w-full"
                    } block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black/[0.8]`}
                  ></span>
                </Link>
              ) : (
                // For contact
                <div
                  className="group transition duration-300 cursor-pointer"
                  onClick={scrollToBottom}
                >
                  {link.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black/[0.8]"></span>
                </div>
              )}
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Menu;
