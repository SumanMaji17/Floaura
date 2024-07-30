import React from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  decrementQuantity,
  incrementQuantity,
  removeProductCart,
} from "../../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CheckoutProduct({ product }) {
  const dispatch = useDispatch();

  const handleIncrement = (e) => {
    try {
      e.preventDefault();
      if (product?.quantity < 5) {
        dispatch(incrementQuantity({ id: product.id, price: product.price }));
      } else {
        toast.info("We're sorry Only 5 unit(s) allowed in each Order");
      }
    } catch (error) {
      console.log("Error while adding quantity");
    }
  };

  const handleDecrement = (e) => {
    try {
      e.preventDefault();
      if (product?.quantity > 1) {
        dispatch(decrementQuantity({ id: product.id, price: product.price }));
      }
    } catch (error) {
      console.log("Error while removing quantity");
    }
  };

  const handleRemoveProduct = (e) => {
    try {
      e.preventDefault();
      dispatch(
        removeProductCart({
          id: product.id,
          price: product.price,
          quantity: product.quantity,
        })
      );
    } catch (error) {
      console.log("Error while removing product");
    }
  };

  return (
    <div className=" flex gap-5 px-5 py-5 rounded-2xl h-48 justify-center items-center  shadow-[0_0_8px_0] shadow-slate-400 m-5">
      <img
        src={product?.image}
        alt="product_image"
        className=" w-[150px] h-[150px] object-fill rounded-2xl"
      />
      <div className=" flex flex-col gap-3 justify-between w-60 overflow-hidden">
        <p className=" text-xl font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
          {product?.productName}
        </p>
        <span className=" text-lg font-medium text-gray-500">
          {product?.price * product?.quantity}
        </span>
        <div className=" flex items-center">
          {product?.quantity === 0 ? (
            <span className="text-red-600 px-2 py-1 text-lg" >Out of stock</span>
          ) : (
            <>
              <div
                className=" p-4 border-2 border-gray-300 cursor-pointer"
                onClick={handleDecrement}
              >
                <FaMinus />
              </div>
              <span className=" py-3 px-8 border-2 border-gray-300">
                {product?.quantity}
              </span>
              <div
                className=" p-4 border-2 border-gray-300 cursor-pointer"
                onClick={handleIncrement}
              >
                <FaPlus />
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className=" text-3xl ml-10 cursor-pointer"
        onClick={handleRemoveProduct}
      >
        <MdDelete />
      </div>
    </div>
  );
}
