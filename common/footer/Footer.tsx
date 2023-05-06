import Image from "next/image";
import React from "react";
import { AiOutlineInstagram, AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#0a0a0a] lg:grid lg:grid-cols-5"
    >
      <div className="relative block h-60 lg:col-span-2 lg:h-full">
        <Image
          width={500}
          height={500}
          src="/assets/images/carousel-1.jpg"
          alt="stay-young-product"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute top-8 w-3/4 lg:top-20 left-8">
          <h2 className=" font-bruno text-2xl mb-4">Stay Young</h2>
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
          <Link
            href="/"
            className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
              Explore More
            </span>
            <span className="absolute inset-0 border-2 border-black"></span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p>
              <span className="text-xs tracking-wide  text-white uppercase">
                Call us
              </span>
              <a
                href="tel:+919734567890"
                className="block text-sm font-medium text-white hover:opacity-75 sm:text-lg"
              >
                +91 9734567890 ,
              </a>
              <a
                href="tel:+9173423423422"
                className="block text-sm mb-3 font-medium text-white hover:opacity-75 sm:text-lg"
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
                className="block text-sm font-medium text-white hover:opacity-75 sm:text-lg"
              >
                stayyoungofficial@mailinator.com
              </a>
            </p>

            <ul className="mt-8 space-y-1 text-sm text-white">
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul>

            <ul className="flex gap-6 mt-8">
              <li>
                <a
                  href="tel:+919734567890"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <AiOutlinePhone size={20} />
                </a>
              </li>

              <li>
                <a
                  href="mailto:stayyoungofficial@mailinator.com"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <BiMailSend size={20} />
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/+919734567890"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <FaWhatsapp size={20} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <AiOutlineInstagram size={20} />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="font-medium text-white">Top Categories</p>
              <nav aria-label="Footer Navigation - Services" className="mt-6">
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
              <nav aria-label="Footer Navigation - Company" className="mt-6">
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

        <div className="pt-12 mt-12 border-t border-white">
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

            <p className="mt-8 text-xs text-white sm:mt-0">
              &copy; {new Date().getFullYear()} Stay Young. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
