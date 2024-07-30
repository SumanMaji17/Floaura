import React from "react";
import { useNavigate } from "react-router-dom";

export default function GiftCard() {
  const navigate = useNavigate();
  const images = [
    {
      id: 1,
      image: "giftCardStatic/Birthday.jpg",
      description: "Birthday Gift",
      title:"Birthday"
    },
    {
      id: 2,
      image: "giftCardStatic/AnniversaryGift.jpeg",
      description: "Anniversary Gift",
      title:"Anniversary"
    },
    {
      id: 3,
      image: "giftCardStatic/Anniversary.jpeg",
      description: "Gift Her",
      title:"Gift-Her"
    },
    {
      id: 4,
      image: "giftCardStatic/Gift-Him.png",
      description: "Gift Him",
      title:"Gift-Him",
    },
  ];
  return (
    <div className=" flex flex-col items-center justify-center text-center gap-1 py-14 px-20">
      <span className=" text-black text-2xl font-semibold">
        Shop By Occasion & Relations
      </span>
      <span className=" text-stone-500 font-medium">
        Surprise Your Loved Ones
      </span>
      <div className=" flex justify-between gap-8 pt-5">
        {images.map((gift) => (
          <div key={gift.id} className=" flex flex-col items-center w-64 overflow-hidden" onClick={()=> navigate(`/${gift.title}`)}>
            <div className=" overflow-hidden rounded-t-full border-slate-400 border-[1px] border-b-0">
            <img
              src={gift.image}
              alt={gift.description}
              className=" w-full  h-64 scale-100 hover:scale-110 ease-linear duration-500"
            />
            </div>
            <span className=" bg-slate-300 w-full p-3 rounded-b-xl border-slate-400 border-[1px] border-t-0">{gift.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
