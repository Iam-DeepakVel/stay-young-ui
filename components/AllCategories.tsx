import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const categories = [
  {
    name: "Cleanser",
    image: "/assets/images/p1.jpg",
    href: "/category/cleanser",
  },
  {
    name: "Toner",
    image: "/assets/images/p2.jpg",
    href: "/category/toner",
  },
  {
    name: "Serum",
    image: "/assets/images/p3.jpg",
    href: "/category/serum",
  },
  {
    name: "Moisturizer",
    image: "/assets/images/p1.jpg",
    href: "/category/moisturizer",
  },
];

const AllCategories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-full max-w-7xl mx-auto md:px-10">
      <div className="flex flex-col md:flex-row my-[50px] md:my-[100px] md:border-b md:pb-24">
        {/* Content */}
        <div className="md:border-r md:w-[30%] md:mr-10 py-5">
          <h2 className="pl-4 md:pl-3 md:text-left text-2xl md:text-4xl  md:mb-4">
            Top Categories
          </h2>
          <p className="pl-4 hidden md:block text-md pr-10 pb-6">
            Explore more products from stay young and get its benefits.
          </p>
          <button className="pl-4 hidden md:flex items-center gap-1 underline underline-offset-4 hover:scale-105 hover:gap-2 hover:underline-offset-8 transform duration-300 ease-in-out ">
            Explore More{" "}
            <span>
              {" "}
              <BsArrowRight className="mt-1" />{" "}
            </span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="md:flex-[2] w-full pl-2 border-b sm:border-none pb-8 sm:pb-0 ">
          <div className="flex items-center gap-6 md:gap-10 overflow-x-scroll scroll-smooth scrollbar-hide md:p-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="py-4 flex-shrink-0 cursor-pointer hover:scale-110 transform duration-200 ease-in-out"
              >
                <Image
                  width={500}
                  height={500}
                  src={category.image}
                  alt="category-image"
                  className="w-28 h-28 sm:w-36 sm:h-36  rounded-[40px]"
                />
                <p className="text-center">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
