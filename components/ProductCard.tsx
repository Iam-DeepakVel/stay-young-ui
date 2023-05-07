import { calculateDiscountPercentage } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: any) => {
  return (
    <Link
      href={`/product/${product?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        src={product?.image[0]}
        alt="product-image"
        width={500}
        height={500}
      />
      <div className=" p-4 text-black/[0.9]">
        <h2 className=" text-lg font-medium">{product.name}</h2>
        <div className=" flex items-center text-black/[0.5]">
          <p className=" mr-2 text-lg font-semibold">
            ₹{product?.discountedPrice}
          </p>
          <p className=" text-base font-medium line-through">
            ₹{product?.price}
          </p>
          <p className=" ml-auto text-base font-medium text-green-500">
            {calculateDiscountPercentage(
              product?.price,
              product?.discountedPrice
            )}
            % off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
