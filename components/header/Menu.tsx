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

const Menu = ({
  showCategoryMenu,
  setShowCategoryMenu,
}: {
  showCategoryMenu: Boolean;
  setShowCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {navLinks.map((link) => (
        <React.Fragment key={link.id}>
          {link.subMenu ? (
            <li
              className="cursor-pointer flex items-center gap-2 relative"
              onMouseEnter={() => setShowCategoryMenu(true)}
              onMouseLeave={() => setShowCategoryMenu(false)}
            >
              {link.name}
              <BsChevronDown size={14} className="mt-1" />
              {showCategoryMenu && (
                <ul className="bg-white/90 absolute top-6 left-0 min-w-[250px]  text-black shadow-lg rounded-lg">
                  {link.subMenu.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href="/"
                      onClick={() => setShowCategoryMenu(false)}
                    >
                      <li className="h-12 flex items-center px-4 py-2 hover:bg-blue-100">
                        {subMenuItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="cursor-pointer">
              <Link href={link.url!}>{link.name}</Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Menu;
