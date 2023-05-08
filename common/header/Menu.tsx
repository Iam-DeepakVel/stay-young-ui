import { scrollToBottom } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

export const navLinks = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "View Products",
    url: "/category",
    subMenu: [
      { id: 1, name: "Cleanser", url: "/category/cleanser" },
      { id: 2, name: "Toner / mist", url: "/category/toner" },
      { id: 3, name: "Serum / essence", url: "/category/serum" },
      { id: 4, name: "Moisturizer", url: "/category/moisturizer" },
    ],
  },
  { id: 3, name: "Contact" },
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
                asPath.includes(link.url) && "font-extrabold"
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
                        } h-12 flex items-center px-4 py-2 hover:bg-[#28282B] hover:text-white hover:scale-110 rounded-md`}
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
              {link.url ? (
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
