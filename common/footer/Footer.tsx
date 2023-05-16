import Image from "next/image";
import React from "react";
import { AiOutlineInstagram, AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer
      className="bg-[#0a0a0a] lg:grid lg:grid-cols-5"
    >
      <div className="relative block h-44 lg:col-span-2 lg:h-full">
        <Image
          width={500}
          height={500}
          src="/assets/images/carousel-1.jpg"
          alt="stay-young-product"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute top-5 w-3/4 lg:top-12 left-8">
          <h2 className=" font-gochiHand text-2xl mb-4">Stay Young</h2>
          <p className="block lg:hidden text-black text-md mb-4">
            Unlock the secret to timeless beauty with Stay Young - where age is
            just a number, and radiance is forever.
          </p>
          <p className="hidden lg:block mb-8 text-black text-md">
            Stay Young is your one-stop destination for Korean skincare products
            that cater to your every need. Our range of products is specially
            curated to help you achieve and maintain youthful, glowing skin that
            looks and feels amazing.Say goodbye to dull, tired skin and hello to
            radiant, youthful skin with Stay Young.{" "}
          </p>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p>
              <span className="text-xs tracking-wide  text-white uppercase">
                Call us
              </span>
              <a
                href="tel:+919734567890"
                className="block text-sm font-medium text-white hover:opacity-75 sm:text-md"
              >
                +91 9734567890
              </a>
              <a
                href="tel:+9173423423422"
                className="block text-sm mb-3 font-medium text-white hover:opacity-75 sm:text-md"
              >
                +91 73423423422
              </a>
            </p>
            <p>
              <span className="text-xs tracking-wide text-white uppercase">
                Mail to
              </span>

              <a
                href="mailto:stayyoungofficial@mailinator.com"
                className="block text-sm font-medium text-white hover:opacity-75 sm:text-md"
              >
                stayyoungofficial@mailinator.com
              </a>
            </p>

            <ul className="mt-4 space-y-1 text-sm text-white">
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul>

            <ul className="flex gap-6 mt-4">
              <motion.li whileHover={{ y: -4 }}>
                <a
                  href="tel:+919734567890"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white"
                >
                  <AiOutlinePhone size={20} />
                </a>
              </motion.li>

              <motion.li whileHover={{ y: -4 }}>
                <a
                  href="mailto:stayyoungofficial@mailinator.com"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white"
                >
                  <BiMailSend size={20} />
                </a>
              </motion.li>

              <motion.li whileHover={{ y: -4 }}>
                <a
                  href="https://wa.me/+919734567890"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </motion.li>

              <motion.li whileHover={{ y: -4 }}>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white"
                >
                  <AiOutlineInstagram size={20} />
                </a>
              </motion.li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-medium text-white">Top Categories</p>
              <nav aria-label="Footer Navigation - Services" className="mt-4">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="/categories/sun-screenn"
                      className="text-white transition hover:opacity-75"
                    >
                      Sun Screen
                    </a>
                  </li>

                  <li>
                    <a
                      href="/categories/toner"
                      className="text-white transition hover:opacity-75"
                    >
                      Toner / mist
                    </a>
                  </li>

                  <li>
                    <a
                      href="/categories/serum"
                      className="text-white transition hover:opacity-75"
                    >
                      Serum / essence
                    </a>
                  </li>

                  <li>
                    <a
                      href="/categories/lotion"
                      className="text-white transition hover:opacity-75"
                    >
                      Lotion / cream
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <p className="font-medium text-white">Useful Links</p>
              <nav aria-label="Footer Navigation - Company" className="mt-4">
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-white transition hover:opacity-75"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/about"
                      className="text-white transition hover:opacity-75"
                    >
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className="text-white transition hover:opacity-75"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-8 border-t border-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <nav aria-label="Footer Navigation - Support">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Terms & Conditions
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-white transition hover:opacity-75"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>

            <p className="mt-4 text-xs text-white sm:mt-0">
              &copy; {new Date().getFullYear()} Stay Young. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
