import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cards({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };
  return (
    <div
      onClick={handleCardClick}
      className=" w-72 border-slate-400 border-[1px] rounded-3xl overflow-hidden scale-95 hover:scale-100 ease-linear duration-150"
    >
      <div>
        <img
          src={product.images[0].url}
          alt="product_image"
          className="w-full h-64 object-fill"
        />
      </div>
      <div className=" gap-2 flex flex-col py-5 px-4 bg-slate-50">
        <h1 className=" text-base text-gray-700 font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
          {product.name}
        </h1>
        <span>
          Rs. &nbsp;
          {product.price <= product.discountedPrice
            ? product.price
            : product.discountedPrice}
        </span>
        <div className=" flex gap-2">
          <div className=" flex justify-center items-center px-2 py-1 gap-2 bg-[#1ebe61]   text-white rounded-lg text-sm font-medium">
            <FaStar className=" text-sm" />
            <span>{product.avgRating === null ? 0 : product.avgRating}</span>
          </div>
          <span>&#8226;</span>
          <span className=" text-blue-500 font-normal text-base">
            {product.reviewCount} Reviews
          </span>
        </div>
        <span className=" text-xs font-medium">
          Earliest Delivery : <span className=" text-sm">Today</span>
        </span>
      </div>
    </div>
  );
}
