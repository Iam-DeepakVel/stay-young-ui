import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";
import { BannerDto } from "@/pages";

interface HeroBannerProps {
  banners: BannerDto[];
}

const HeroBanner = ({ banners }: HeroBannerProps) => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1920px]  mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        interval={4000}
        transitionTime={1000}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute active:scale-90 transition-all duration-300 right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[40px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <IoIosArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute active:scale-90 transition-all duration-300 right-0 bottom-0 w-[30px] md:w-[50px] h-[40px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <IoIosArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {banners?.map((banner) => (
          <div key={banner._id}>
            {/*Image  */}
            <Image
              width={5000}
              height={5000}
              priority
              src={banner.image}
              className="aspect-[16/10] h-[400px] md:h-[600px] md:aspect-auto object-cover"
              alt={banner.title}
            />
            {/* Image Content */}
            <div className="absolute left-4 md:left-20 top-0 w-[60%] md:w-full text-start flex flex-col mt-14 md:mt-0 sm:justify-center h-full gap-6">
              <div className="flex flex-col justify-center gap-3 md:gap-5">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                  variants={{
                    hidden: { opacity: 0, x: +120 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className=" text-black text-sm md:text-lg"
                >
                  {banner.subTitle}
                </motion.div>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, x: +120 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="text-black text-lg md:text-4xl font-extrabold"
                >
                  {banner.title}
                </motion.p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, x: +120 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="text-gray-700 text-sm flex items-center gap-2"
                >
                  {banner.tags.map((tag) => (
                    <p key={tag}>{`#${tag}`}</p>
                  ))}{" "}
                </motion.div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.1, delay: 0.4 }}
                variants={{
                  hidden: { opacity: 0, x: +120 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href={banner.link}
                  className="relative w-32 pl-3 py-2 md:w-44 md:px-6 md:py-3 inline-flex items-center  overflow-hidden text-lg font-medium text-black border-2 border-black  hover:text-white group hover:bg-gray-50"
                >
                  <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="relative text-sm md:text-lg">See More</span>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
