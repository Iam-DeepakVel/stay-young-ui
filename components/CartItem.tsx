import { StoreContext } from "@/store/store";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ item }: any) => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item: any) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    toast.success("Removed from Cart");
  };

  const updateCarthandler = (item: any, qty: string) => {
    // Options in select box is an string , So converting it to number
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success(`Quantity updated to ${quantity}`);
  };

  return (
    <div className=" flex py-5  relative gap-3 md:gap-5 border-b">
      {/* Image */}
      <div className=" shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={item.image[0]} alt={item.name} />
      </div>

      <div className=" w-full flex flex-col">
        <div className=" flex flex-col md:flex-row justify-between">
          {/* Product Title */}
          <h2 className=" text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item.name}
          </h2>
          {/* Product Sub Title */}
          <h4 className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {item.subName}
          </h4>
          {/*Product Price  */}
          <div>
            <p className=" text-sm md:text-lg font-bold  mt-2">
              ₹ {item.discountedPrice}
            </p>
            <p className="text-black/[0.5] text-xs text-end font-medium line-through">
              ₹{item?.price}
            </p>
          </div>
        </div>
        {/* Product Sub Title - desktop */}
        <h4 className=" text-md font-medium text-black/[0.5] hidden md:block">
          {item.subName}
        </h4>
        {/*Quantity  */}
        <div className="flex items-center justify-between gap-1 mt-4">
          <div className="flex items-center gap-2 text-black/[0.5] text-sm md:text-md">
            <h4 className="font-semibold">Quantity:</h4>
            <select
              value={item.quantity}
              onChange={(e) => updateCarthandler(item, e.target.value)}
              className=" p-1 text-center hover:text-black"
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => removeItemHandler(item)}>
            <RiDeleteBin6Line className="absolute top-7 right-10 md:static cursor-pointer text-black/[0.5] hover:text-black text-[18px] md:text-[20px] " />
          </button>
        </div>
        {/* Delete Icon */}
      </div>
    </div>
  );
};

export default CartItem;
