import React from "react";
import { Link } from "react-router-dom";

export default function SellWithUs() {
  return (
    <div className=" mx-10">
      <span className="flex gap-1 font-medium text-xs">
        <Link to={"/"}>
          <span className=" underline text-cyan-900">Home</span>
        </Link>
        <span>&gt;</span>
        <span>Sell With Us</span>
      </span>
      <div className=" flex flex-col justify-center items-center gap-10">
        <img src="Sell With Us.png" alt="sell" className=" w-[700px]" />
        <h1 className=" text-lg font-semibold bg-slate-50 rounded-md text-gray-500 border-2 px-10 py-4">
          This feature is currently under development.
        </h1>
      </div>
    </div>
  );
}
