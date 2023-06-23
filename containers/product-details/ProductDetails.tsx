/* eslint-disable @next/next/no-img-element */
import Wrapper from "@/layouts/Wrapper";
import React, { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RelatedProducts from "@/components/RelatedProducts";
import { StoreContext } from "@/store/store";
import { calculateDiscountPercentage } from "@/utils/utils";
import { toast } from "react-hot-toast";

function ProductDetailsCarousel({
  productImages,
  productName,
}: {
  productImages: string[];
  productName: string;
}) {
  return (
    <div className=" sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        showThumbs={true}
        swipeable={true}
        className="productCarousel"
      >
        {productImages?.map((src) => (
          <img src={src} alt={productName} key={src} />
        ))}
      </Carousel>
    </div>
  );
}

const ProductDetails = ({ product }: any) => {
  const { state, dispatch } = useContext(StoreContext);

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
  };

  const [relatedProducts, setRelatedProducts] = useState<any>();

  useEffect(() => {
    async function fetchProducts() {
      if (product) {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_STAY_YOUNG_API
          }/product/category/${product.category[0].name.toLowerCase()}`
        );
        const relatedProducts = await res.json();

        setRelatedProducts(
          relatedProducts.filter((item: any) => item._id !== product._id)
        );
      }
    }
    fetchProducts();
  }, [product]);

  return (
    <div className=" w-full md:py-20">
      <Wrapper>
        <div className=" flex flex-col gap-[50px] md:px-10 lg:flex-row lg:gap-[100px]">
          {/* Left Section - Product Details Carousel */}
          <div className=" mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
            <ProductDetailsCarousel
              productImages={product?.images}
              productName={product?.name}
            />
          </div>

          {/* Right Section */}
          <div className=" flex-[1] py-3">
            {/* Product Title */}
            <h2 className=" mb-2 text-[34px] font-semibold">{product?.name}</h2>
            {/* Product Subtitle */}
            <div className="mb-5 text-lg font-semibold">{product?.subName}</div>
            {/* Product Price */}
            <div className=" text-lg font-semibold">
              <div className=" flex items-center">
                <p className=" mr-2 text-xl font-semibold">
                  Price: ₹{product?.discountedPrice}
                </p>
                {product?.price !== product?.discountedPrice && (
                  <>
                    <p className=" text-sm font-medium text-black/[0.5] line-through">
                      ₹{product?.price}
                    </p>
                    <p className="ml-4 text-base font-medium text-green-500">
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
            {/* taxes and duties*/}
            <div className=" text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md mb-2 font-medium text-black/[0.5]">
              {`(Also includes all applicable duties)`}
            </div>

            {product?.countInStock === 0 && (
              <div className="text-xl text-red-500">Out of Stock</div>
            )}

            {/*Add to Cart*/}
            <button
              onClick={AddToCartHandler}
              className=" mb-8 mt-10 w-full rounded-full bg-black py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
            >
              Add to Cart
            </button>
            <div>
              <h1 className="mb-4 text-[24px] font-bold">Product Details</h1>
              <p className=" text-md mb-5">{product?.description}</p>
            </div>
          </div>
        </div>

        {relatedProducts && (
          <RelatedProducts relatedProducts={relatedProducts} />
        )}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
