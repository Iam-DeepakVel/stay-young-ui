import React, { useState, useEffect, useContext } from "react";
import Wrapper from "../../layouts/Wrapper";
import Menu from "./Menu";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { BiMenuAltRight } from "react-icons/bi";
import MenuMobile from "@/common/header/MenuMobile";
import { StoreContext } from "@/store/store";
import Image from "next/image";
import { motion } from "framer-motion";
import { CategoryDto } from "@/pages/admin/categories/[id]";
import { BrandDto } from "@/pages/admin/brands/[id]";

const Header = () => {
  const [show, setShow] = useState("translate-y-0");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<CategoryDto[] | null>(null);
  const [brands, setBrands] = useState<BrandDto[] | null>(null);

  const { state } = useContext(StoreContext);
  const { cart } = state;

  const [CartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart?.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) {
          setShow("-translate-y-[80px]");
        } else {
          setShow("shadow-sm");
        }
      } else {
        setShow("translate-y-0");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Fetching Categories
  async function fetchCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/category`
      );
      setCategories(await res.json());
    } catch (error) {
      console.log("Error Fetching Categoires", error);
    }
  }

  async function fetchBrands() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/brand`
      );
      setBrands(await res.json());
    } catch (error) {
      console.log("Error Fetching Brands", error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <header
      className={`w-full h-[60px] py-1 md:py-0 md:h-[80px] bg-white items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show} `}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
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

        {/* Nav Links */}
        <Menu
          categories={categories}
          brands={brands}
        />

        {mobileMenu && (
          <MenuMobile
            setMobileMenu={setMobileMenu}
            categories={categories}
            brands={brands}
          />
        )}

        {/* Nav Icons - Cart , Hamburger */}
        <div className=" flex items-center gap-2 text-black">
          {/* Cart Icon Start */}
          <motion.div whileTap={{ scale: 0.6 }}>
            <Link
              href="/cart"
              className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center   hover:bg-black/[0.05] cursor-pointer relative"
            >
              <BsCart className="text-[18px] md:text-[20px]" />
              {CartItemsCount > 0 && (
                <p className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {CartItemsCount}
                </p>
              )}
            </Link>
          </motion.div>
          {/* Cart Icon End */}

          {/*Hamburger Icon Start  */}
          <div className=" w-8 md:w-12 md:hidden h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className=" text-[18px] active:scale-75 transition-all duration-300"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[22px] active:scale-75 transition-all duration-300"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/*Hamburger Icon End  */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
