import React, { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { clearCartAction } from "../../../redux/actions/cartAction";
import { toast } from "react-toastify";


export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [openBox, setOpenBox] = useState(false);

  const handleClearCart = () => {
    try {
      dispatch(clearCartAction());
      setOpenBox(false);
      toast.success("Items remove from cart Successfully...");
    } catch (error) {
      console.log("Error while clearing cart");
    }
  };

  return (
    <>
      <div className=" flex flex-col mx-5">
        <div className=" flex flex-col px-10 gap-5">
          <h1 className=" text-3xl font-bold">My Cart</h1>
          {cart.totalItems > 0 && (
            <span className=" text-xl">
              {cart.totalItems} express delivery Products...
            </span>
          )}
          <div className=" flex justify-between py-5">
            <Link to={"/"}>
              <span className=" flex gap-2 px-3 py-3 bg-cyan-900 text-white rounded-lg font-medium cursor-pointer">
                <TiArrowBack className=" text-2xl" />
                <h1>Continue Shopping...</h1>
              </span>
            </Link>
            {cart.totalItems > 0 && (
              <span
                className=" flex items-center gap-2 px-5 py-3 bg-cyan-900 text-white rounded-lg font-medium cursor-pointer"
                onClick={() => setOpenBox(true)}
              >
                <h1>Clear Cart</h1>
                <MdDelete className=" text-2xl" />
              </span>
            )}
          </div>
        </div>
        {cart.totalItems > 0 ? (
          <div className=" flex flex-row justify-around">
            <ul>
              {cart?.items.map((item) => (
                <li key={item.id}>
                  <CheckoutProduct product={item} key={item.id} />
                </li>
              ))}
            </ul>
            <div className=" ">
              <SubTotal total={cart?.totalPrice} />
            </div>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center">
            <img
              src="emptyCart.svg"
              alt="empty_cart"
              className=" w-[150px] h-[150px]"
            />
            <h1 className=" text-gray-500 text-lg">
              Hey, You have nothing in your cart. Let’s add gifts to your cart
            </h1>
          </div>
        )}
      </div>
      {openBox && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden">
          <div
            className="bg-white rounded-3xl flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-8 border border-black rounded-lg">
              <p>Are you sure you want to clear the cart?</p>
              <div className=" pt-3 flex justify-around ">
                <button
                  className=" bg-red-500 hover:bg-red-600 active:bg-red-500 text-white px-3 py-2 rounded-lg"
                  onClick={handleClearCart}
                >
                  Clear All
                </button>
                <button
                  className=" bg-slate-400 hover:bg-slate-500 active:bg-slate-400 text-white px-3 py-2 rounded-lg"
                  onClick={() => setOpenBox(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
