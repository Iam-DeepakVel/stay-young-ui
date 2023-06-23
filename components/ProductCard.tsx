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
      className="relative transform duration-200 hover:scale-105"
    >
      {showIcons && (
        <button
          onClick={AddToCartHandler}
          className="absolute bottom-20 right-2 hidden transform cursor-pointer space-y-4 rounded-full bg-white/[0.7]  p-2 text-black/[0.6]  duration-200 hover:scale-125 hover:text-black  sm:block md:bottom-28 md:right-4"
        >
          <BsCart2 size={25} />
        </button>
      )}

      {/*Best Tag  */}
      {showBestSellerTag && (
        <div className="absolute left-0 top-0 flex h-7  w-24 flex-col items-center justify-center bg-black md:h-10 md:w-28">
          <h2 className=" md:text-md text-sm text-white">Best Seller</h2>
        </div>
      )}
      <Link
        href={`/product/${product?.slug}`}
        className=" cursor-pointer overflow-hidden"
      >
        <Image
          src={product?.images[0]}
          alt="product-image"
          width={500}
          height={500}
          priority
        />
        <div className="py-4 text-black/[0.9]  md:p-4">
          <h2 className=" text-xs font-medium sm:text-sm md:text-lg">
            {product.name}
          </h2>
          <div className=" flex items-center text-black/[0.5]">
            <p className=" mr-2 text-sm font-semibold md:text-lg">
              ₹{product?.discountedPrice}
            </p>
            {product?.price !== product?.discountedPrice && (
              <>
                <p className=" text-xs font-medium line-through md:text-base">
                  ₹{product?.price}
                </p>
                <p className=" ml-auto text-xs font-medium text-green-500 md:text-base">
                  {calculateDiscountPercentage(
                    product?.price,
                    product?.discountedPrice
                  )}
                  % off
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
