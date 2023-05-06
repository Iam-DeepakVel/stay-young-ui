import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = () => {
  return (
    <div className=" flex py-5  relative gap-3 md:gap-5 border-b">
      {/* Image */}
      <div className=" shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="/assets/images/p1.jpg" alt="product-1" />
      </div>

      <div className=" w-full flex flex-col">
        <div className=" flex flex-col md:flex-row justify-between">
          {/* Product Title */}
          <h2 className=" text-lg md:text-2xl font-semibold text-black/[0.8]">
            Lotion
          </h2>
          {/* Product Sub Title */}
          <h4 className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Smooth Lotions
          </h4>
          {/*Product Price  */}
          <p className=" text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP: ₹ 450.00
          </p>
        </div>
        {/* Product Sub Title - desktop */}
        <h4 className=" text-md font-medium text-black/[0.5] hidden md:block">
          Smooth Lotions
        </h4>
        {/*Quantity  */}
        <div className="flex items-center justify-between gap-1 mt-4">
          <div className="flex items-center gap-2 text-black/[0.5] text-sm md:text-md">
            <h4 className="font-semibold">Quantity:</h4>
            <select className=" p-1 text-center hover:text-black">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <RiDeleteBin6Line className="absolute top-7 right-10 md:static cursor-pointer text-black/[0.5] hover:text-black text-[18px] md:text-[20px] " />
        </div>
        {/* Delete Icon */}
      </div>
    </div>
  );
};

export default CartItem;
