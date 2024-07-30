import React from "react";
import Cards from "./Cards";

export default function Products() {
  
  return (
    <div className="  bg-slate-200 w-screen h-screen">
      <div className=" px-14 py-5 flex flex-col gap-1">
        <h2 className=" text-black text-2xl font-semibold">
          Flower Bouquet Online
        </h2>
        <span className=" text-xs">
          Red rose is the epitome of love and romance that can intensify the
          love in a relationship by its presence. So, if you want to infuse more
          romance into your relationship, don't forget to send a rose flower
          bouquet of ravishing red roses to your beloved on special occasions
          with our same day and midnight delivery.
        </span>
        <span className=" flex justify-end text-[10px] text-gray-600">Item 30 of 188 Total | Ranging From Rs.295 to Rs.36000</span>
      </div>
      <div className=" bg-white py-8 px-14 mx-8 rounded-3xl">
        <div>
            <span className=" border-slate-400 border-[1px] p-2 bg-slate-50 rounded-lg hover:bg-slate-200 hover:border-slate-500">Birthday</span>
        </div>
        <div>
          {

          }
           <Cards /> 
        </div>
      </div>
    </div>
  );
}
