import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { navLinks } from "./Menu";

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
    <ul className="flex bg-white flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] border-t text-black">
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <li
              className="cursor-pointer  py-4 px-5 border-b flex flex-col relative "
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              <div className="flex justify-between items-center">
                {link.name}
                <BsChevronDown size={14} className="mt-1" />
              </div>

              {showCategoryMenu && (
                <ul className="bg-black/[0.01] -mx-5 mt-4 -mb-4">
                  {link.subMenu.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href={subMenuItem.url}
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
