import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center px-20 py-10">
      <span className=" flex flex-col gap-6">
        <h1 className=" text-5xl font-semibold">Something went wrong</h1>
        <h3 className=" text-2xl font-semibold">But it’s OK, We Got You</h3>
        <button
          className=" border border-slate-600 w-44 px-4 py-2 rounded-3xl text-lg font-normal transition-colors ease-in delay-150 duration-200  hover:text-white hover:bg-cyan-900 "
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </span>
      <img src="img404.avif"alt="page_not_found" />
    </div>
  );
}
