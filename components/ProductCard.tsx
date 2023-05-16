import { StoreContext } from "@/store/store";
import { calculateDiscountPercentage } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCart2 } from "react-icons/bs";

const ProductCard = ({ product, showBestSellerTag }: any) => {
  const [showIcons, setShowIcons] = useState(false);

  const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();

  const AddToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > 15) {
      toast.error("Max quantity selected");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Added to cart");
    router.push("/cart");
  };

  return (
    <div
      onMouseOver={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      className="relative hover:scale-105 transform duration-200"
    >
      {showIcons && (
        <button
          onClick={AddToCartHandler}
          className="hidden sm:block absolute bottom-20 right-2 md:bottom-28 md:right-4 bg-white/[0.7] rounded-full  space-y-4 p-2  text-black/[0.6] hover:text-black hover:scale-125  transform duration-200 cursor-pointer"
        >
          <BsCart2 size={25} />
        </button>
      )}

      {/*Best Tag  */}
      {showBestSellerTag && (
        <div className="bg-black w-24 h-7 md:w-28 md:h-10  flex flex-col items-center justify-center absolute top-0 left-0">
          <h2 className=" text-white text-sm md:text-md">Best Seller</h2>
        </div>
      )}
      <Link
        href={`/product/${product?.slug}`}
        className=" overflow-hidden cursor-pointer"
      >
        <Image
          src={product?.images[0]}
          alt="product-image"
          width={500}
          height={500}
        />
        <div className="py-4 md:p-4  text-black/[0.9]">
          <h2 className=" text-xs sm:text-sm md:text-lg font-medium">
            {product.name}
          </h2>
          <div className=" flex items-center text-black/[0.5]">
            <p className=" mr-2 text-sm md:text-lg font-semibold">
              ₹{product?.discountedPrice}
            </p>
            <p className=" text-xs md:text-base font-medium line-through">
              ₹{product?.price}
            </p>
            <p className=" ml-auto text-xs md:text-base font-medium text-green-500">
              {calculateDiscountPercentage(
                product?.price,
                product?.discountedPrice
              )}
              % off
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
