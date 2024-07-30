import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Product({ product }) {
  return (
    <div
      className=" w-72 border-slate-400 border-[1px] rounded-3xl overflow-hidden scale-95 hover:scale-100 ease-linear duration-150"
      key={product.id}
    >
      <div>
        <img
          src={product.images[0].url}
          alt="product_image"
          className=" w-full  h-64"
        />
      </div>
      <div className=" gap-2 flex flex-col py-5 px-4 bg-white h-full">
        <h1 className=" text-base text-gray-700 font-medium ">
          Id: {product.id}
        </h1>
        <h1 className=" text-base text-gray-700 font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
          {product.name}
        </h1>
        <div className=" flex justify-between">
          <span>
            Rs. &nbsp;
            {product.price <= product.discountedPrice
              ? product.price
              : product.discountedPrice}
          </span>
          <span> Orders: 7</span>
        </div>
        <div className=" flex justify-between">
          <div className=" flex items-center justify-center gap-2 w-[40%] p-3 border rounded-lg bg-[#141B24] hover:bg-[#222e3d] font-semibold text-white  active:bg-slate-900 ">
            <span>Edit</span>
            <FaRegEdit className=" text-xl" />
          </div>
          <div className=" flex items-center justify-center gap-2 w-[40%] p-3 border rounded-lg bg-[#141B24] hover:bg-[#222e3d] font-semibold text-white  active:bg-slate-900 ">
            <span>Delete</span>
            <MdDelete className=" text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
