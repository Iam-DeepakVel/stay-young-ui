import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

export const navLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  {
    id: 3,
    name: "Categories",
    url: "/category",
    subMenu: [
      { id: 1, name: "sun screen", url: "/category/sun-screen" },
      { id: 2, name: "Toner / mist", url: "/category/toner" },
      { id: 3, name: "Serum / essence", url: "/category/serum" },
      { id: 4, name: "lotion / cream", url: "/category/lotion" },
    ],
  },
  { id: 4, name: "Contact", url: "/contact" },
];

const Menu = ({
  showCategoryMenu,
  setShowCategoryMenu,
}: {
  showCategoryMenu: Boolean;
  setShowCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { asPath } = useRouter();
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <li
              className={`cursor-pointer ${
                asPath.includes(link.url) &&
                "font-extrabold"
              } flex items-center gap-2 relative`}
              onMouseEnter={() => setShowCategoryMenu(true)}
              onMouseLeave={() => setShowCategoryMenu(false)}
            >
              {link.name}
              <BsChevronDown size={14} className="mt-1" />
              {showCategoryMenu && (
                <ul className="bg-white/95 absolute top-6 left-0 min-w-[250px]  text-black shadow-lg rounded-lg">
                  {link.subMenu.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href={subMenuItem.url}
                      onClick={() => setShowCategoryMenu(false)}
                    >
                      <li
                        className={`${
                          asPath === subMenuItem.url &&
                          "bg-[#28282B] text-white"
                        } h-12 flex items-center px-4 py-2 hover:bg-[#28282B] hover:text-white`}
                      >
                        {subMenuItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="cursor-pointer">
              <Link
                href={link.url!}
                className={`${
                  asPath === link.url &&
                  "font-extrabold"
                }`}
              >
                {link.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Menu;
