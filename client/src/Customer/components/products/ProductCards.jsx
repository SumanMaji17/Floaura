import React from "react";

export default function ProductCards() {
  return (
    <div className=" grid grid-cols-2 mx-10 bg-slate-200 rounded-3xl">
      <div className=" grid grid-cols-2 bg-white ml-8 mt-8 mr-4 mb-4 rounded-3xl overflow-hidden">
        <img
          src="productCardStatic/Cake.jpeg"
          alt="product"
          className=" w-full h-[250px] object-fill"
        />
        <div className=" p-5 bg-gradient-to-tl from-indigo-900 to-blue-100">
          <h1 className=" pb-3 font-bold text-xl">Delicious Cake</h1>
          <div className=" flex flex-col gap-3 font-semibold text-white">
            <h1>Anniversary Cakes</h1>
            <h1>BirthDay Cakes</h1>
            <h1>Designer Cakes</h1>
            <h1>Photo Cakes</h1>
            <h1>Chocolate Cakes</h1>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 bg-white ml-4 mt-8 mr-8 mb-4 rounded-3xl overflow-hidden">
        <img
          src="productCardStatic/Gift.jpeg"
          alt="gift"
          className=" w-full h-[250px] object-fill"
        />
        <div className=" p-5 bg-gradient-to-tl from-black to-slate-300">
          <h1 className=" pb-3 font-bold text-xl">Gifting Gallery</h1>
          <div className=" flex flex-col gap-3 font-semibold text-white">
            <h1>Photo Gallery</h1>
            <h1>Mugs</h1>
            <h1>Cushions</h1>
            <h1>Name Gifts</h1>
            <h1>Caricatures</h1>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 bg-white ml-8 mt-4 mr-4 mb-8 rounded-3xl overflow-hidden">
        <img
          src="productCardStatic/Flower.jpeg"
          alt="flower"
          className=" w-full h-[250px] object-fill"
        />
        <div className=" p-5 bg-gradient-to-tl from-black  to-fuchsia-400">
          <h1 className=" pb-3 font-bold text-xl">Floral Delights</h1>
          <div className=" flex flex-col gap-3 font-semibold text-white">
            <h1>Red Roses</h1>
            <h1>BirthDay Flowers</h1>
            <h1>Anniversary Flowers</h1>
            <h1>Flower Boxes</h1>
            <h1>Exotic Flowers</h1>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 bg-white ml-4 mt-4 mr-8 mb-8 rounded-3xl overflow-hidden">
        <img
          src="productCardStatic/Plant.jpeg"
          alt="plant"
          className=" w-full h-[250px] object-fill"
        />
        <div className=" p-5 bg-gradient-to-tl from-emerald-800  to-white ">
          <h1 className=" pb-3 font-bold text-xl">Plant Paradise</h1>
          <div className=" flex flex-col gap-3 font-semibold text-white">
            <h1>Bonsai</h1>
            <h1>Indoor</h1>
            <h1>Air Purifying</h1>
            <h1>Lucy Bamboo</h1>
            <h1>Flowering</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
