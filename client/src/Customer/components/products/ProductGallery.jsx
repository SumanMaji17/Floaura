import React from "react";
import Cards from "../../../common/Product/Cards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductGallery() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const filteredProducts = products.slice(0,12);
  return (
    <div className=" flex flex-col">
      <div className=" flex flex-row justify-between">
        <div className=" flex flex-col">
          <h1 className=" text-3xl font-bold">Best Selling Flowers & Gifts</h1>
          <span className=" text-lg font-semibold text-gray-500">
            Surprise Your Loved Ones
          </span>
        </div>

        <div
          className=" flex items-end"
          onClick={() => navigate("/best-seller")}
        >
          <div className=" flex justify-end items-end font-bold py-4 px-14 rounded-xl border-2 border-slate-800 transition-colors ease-in delay-150 duration-150 text-white  bg-slate-800 hover:text-slate-800 hover:bg-white ">
            View All
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-4">
        {filteredProducts.map((product) => (
          <Cards product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
