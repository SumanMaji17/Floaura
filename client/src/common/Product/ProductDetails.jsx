import React, { useEffect, useState } from "react";
import { FaCaretDown, FaStar } from "react-icons/fa";
import ImageSlider from "../ImageSlider/ImageSlider";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCartAction,
  isProductInCart,
} from "../../redux/actions/cartAction";
import LoginPage from "../../Customer/components/LoginPage/LoginPage";

export default function ProductDetails({ product }) {
  const [productInCart, setProductInCart] = useState(false);
  const [productAddToCart, setProductAddToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const {
    name,
    images,
    description,
    price,
    discountedPrice,
    stock,
    avgRating,
    reviewCount,
  } = product ? product : location.state.product;

  const imagesArray = product ? images : images.map((img) => img.url);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  function getRandomDateInNext7Days() {
    const currentDate = new Date();
    const next7Days = new Date(currentDate);
    next7Days.setDate(currentDate.getDate() + 7);

    const next7thDate = new Date(
      currentDate.getTime() + (next7Days.getTime() - currentDate.getTime())
    );

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
    }).format(next7thDate);

    return formattedDate;
  }

  const handleAdd = async () => {
    try {
      if (!stock) {
        toast.error("Out of Stock");
      } else {
        const productPrice = discountedPrice < price ? discountedPrice : price;
        const quantity = 1;
        dispatch(
          addToCartAction({
            product: {
              id: productId,
              productName: name,
              image: imagesArray[0],
              price: productPrice,
              quantity,
            },
          })
        );
        setProductAddToCart(true);
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.log("Error while adding to cart" + error);
    }
  };

  useEffect(() => {
    if (productId) {
      setProductInCart(isProductInCart(productId));
    }
  }, [productId]);

  const [isLogin, setLogin] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const handleLoginSuccess = () => {
    setLogin(false);
  };

  // const handlePlaceOrder = () => {
  //   try {
  //     if (userInfo) {
  //       navigate("/check-out",{state:{product:}});
  //     } else {
  //       setLogin(true);
  //     }
  //   } catch (error) {
  //     console.log("Error while placing order..");
  //   }
  // };

  return (
    <>
      <div className=" bg-white mx-20 rounded-2xl shadow-[0_0_8px_0] shadow-slate-400">
        <div className="grid gap-4" style={{ gridTemplateColumns: "50% 50%" }}>
          <div className=" p-8 mt-5">
            <ImageSlider images={imagesArray} />
          </div>
          <div className=" flex flex-col p-8 gap-5">
            <div className=" text-2xl font-semibold ">{name}</div>
            <div className=" flex gap-2">
              <div className=" flex justify-center items-center px-2 py-1 gap-2 bg-[#1ebe61]   text-white rounded-lg text-sm font-medium">
                <FaStar className=" text-sm" />
                <span>{avgRating === null ? 0 : avgRating}</span>
              </div>
              <span>&#8226;</span>
              <span className=" text-blue-500 font-normal text-base">
                {reviewCount} Reviews
              </span>
            </div>

            <div className="flex gap-2 items-center">
              {discountedPrice < price ? (
                <>
                  <div className="text-2xl font-semibold">
                    {discountedPrice}
                  </div>
                  <div className="text-gray-600 font-medium">
                    Price:
                    <span className="line-through">{price}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-gray-600 font-medium">
                    Price:
                    <span className="text-2xl font-semibold"> {price}</span>
                  </div>
                </>
              )}
            </div>
            <div>
              <h6 className="text-sm">Inclusive of all taxes</h6>
              <div className="flex gap-3 items-center">
                <h6 className="text-sm">No Cost EMI available</h6>
                <h6 className="text-xs text-amazon-blue underline flex items-center cursor-pointer">
                  EMI Options
                  <FaCaretDown />
                </h6>
              </div>
            </div>
            <div className=" flex flex-col border-[1px] border-slate-300">
              <div
                className=" flex p-3 bg-slate-200 items-center text-lg font-normal cursor-pointer"
                onClick={toggleDropdown}
              >
                <span>Product Description</span>
                {isOpen ? (
                  <BiChevronUp className="ml-2 text-gray-600 text-2xl" />
                ) : (
                  <BiChevronDown className="ml-2 text-gray-600 text-2xl" />
                )}
              </div>
              {isOpen && <p className=" bg-slate-50 p-4">{description}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <span>Get it by {getRandomDateInNext7Days()}</span>
              <span className="inline-flex font-semibold">
                {stock === 0 ? (
                  <>
                    <span className=" text-red-600 px-2 py-1 text-lg">
                      Out of Stock
                    </span>
                  </>
                ) : stock > 10 ? (
                  <>
                    <span className="bg-green-300 text-green-600 px-2 py-1 rounded-full">
                      In stock
                    </span>
                  </>
                ) : (
                  <>
                    <span className=" text-red-600 px-2 py-1 text-lg">
                      {stock} Left
                    </span>
                  </>
                )}
              </span>
            </div>

            <div className=" flex items-center justify-center gap-3">
              {productInCart || productAddToCart ? (
                <div
                  className=" flex items-center justify-center w-56 h-12 border-cyan-900 text-cyan-900 font-medium border-[1px] bg-white rounded-md active:bg-slate-100 cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  Go To Cart
                </div>
              ) : (
                <div
                  className=" flex items-center justify-center w-56 h-12 border-cyan-900 text-cyan-900 font-medium border-[1px] bg-white rounded-md active:bg-slate-100 cursor-pointer"
                  onClick={handleAdd}
                >
                  ADD TO CART
                </div>
              )}
              <div className=" flex items-center justify-center w-56 h-12 border-cyan-900 bg-cyan-900 border-[1px] text-white font-medium rounded-md hover:bg-cyan-800 active:bg-cyan-900 cursor-pointer">
                BUY NOW | RS {discountedPrice < price ? discountedPrice : price}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogin && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden"
          onClick={() => setLogin(false)}
        >
          <div
            className="flex rounded-lg shadow-lg w-full h-[550px] sm:w-3/4 lg:w-7/12 bg-white sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
