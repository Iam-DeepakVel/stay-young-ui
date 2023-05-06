import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const navLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  {
    id: 3,
    name: "Categories",
    subMenu: [
      { id: 1, name: "Sun Screen" },
      { id: 2, name: "Toner / mist" },
      { id: 3, name: "Serum / essence" },
      { id: 4, name: "lotion / cream" },
    ],
  },
  { id: 4, name: "Contact", url: "/contact" },
];

const MenuMobile = ({
  showCategoryMenu,
  setShowCategoryMenu,
  setMobileMenu,
}: {
  showCategoryMenu: Boolean;
  setShowCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] border-t text-black">
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <li
              className="cursor-pointer py-4 px-5 border-b flex flex-col relative "
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              <div className="flex justify-between items-center">
                {link.name}
                <BsChevronDown size={14} className="mt-1" />
              </div>

              {showCategoryMenu && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {link.subMenu.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href="/"
                      onClick={() => {
                        setShowCategoryMenu(false);
                        setMobileMenu(false);
                      }}
                    >
                      <li className="py-4 px-8 border-t flex justify-between">
                        {subMenuItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="py-4 px-5 border-b">
              <Link href={link.url!} onClick={() => setMobileMenu(false)}>
                {link.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MenuMobile;
