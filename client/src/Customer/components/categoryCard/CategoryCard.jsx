import React from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/categorysData.json"

export default function CategoryCard({categoryData,titles}) {
  const navigate= useNavigate();

  return (
    <div className=" flex flex-col  items-center justify-center text-center gap-1 py-10 px-10 sm:mx-5">
      <span className=" text-black text-2xl font-semibold">
        {titles?.headTitle}
      </span>
      
      <div className=" flex justify-between gap-8 pt-5 sm:gap-0">
        {categoryData?.map((gift) => (
          <div
            key={gift.id}
            className=" flex flex-col items-center p-3 w-52 h-60 overflow-hidden"
            onClick={()=> navigate(`/${gift.title}`)}
          >
            <div className=" overflow-hidden rounded-xl w-full h-full bg-black border-slate-400 border-[1px]">
              <img
                src={gift.image}
                alt={gift.title}
                className="w-full h-full object-cover  scale-100 hover:scale-110 ease-linear duration-500"
                
              />
            </div>
            <span className="  w-full p-3 ">
              {gift.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
