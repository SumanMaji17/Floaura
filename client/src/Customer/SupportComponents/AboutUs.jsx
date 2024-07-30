import React from "react";
import { CiDeliveryTruck, CiFaceSmile } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiMapPinLight } from "react-icons/pi";

export default function AboutUs() {
  return (
    <div className=" mx-10 flex flex-col gap-8">
      <h1 className=" text-[25px] font-bold">#RedefiningGifting</h1>
      <p>
        In a fast-paced world where meaningful moments with loved ones can slip
        through our fingers and the demands of daily life often obscure the
        things that truly matter, FloAura is your partner in nurturing
        genuine human connections that you dearly crave. For 13 wonderful years,
        we've not only added extra sparkle to numerous celebrations but have
        also touched many souls and treasured countless relationships. Our
        journey has always walked hand in hand with your evolving needs and
        changing tastes. And every gift within our collection, whether it be a
        delectable cake, bouquet, or a personalised keepsake, has carried a
        story of love, gratitude, and affection.
      </p>
      <p>
        Now, we renew our vows by breathing new life into FloAura, infusing
        it with a modern touch—one that champions luxury, aesthetics, and the
        deepest emotions—to align with the ever-shifting realm of gifting. Yet,
        at its core, the heart of FloAura remains the same, unwavering in its
        commitment. After all, we don't just deliver gifts; we facilitate the
        expression of your feelings and the forging of deep ties with those you
        cherish. This promise has been our guiding light for years, and now,
        with the dawn of a redefined FloAura, it shines with even more warmth
        to help you keep that flame of love blazing!
      </p>
      <div className=" flex flex-col gap-8 justify-center items-center">
        <h1 className=" text-2xl font-bold">
          FloAura, when words are not enough
        </h1>
        <div className=" grid grid-cols-4 gap-8">
          <div className=" flex flex-col justify-center gap-5 items-center bg-slate-200 py-14 px-5 rounded-2xl">
            <CiFaceSmile className=" text-5xl" />
            <div className=" flex flex-col items-center text-lg">
              <span className=" font-medium">20+ Mn Smiles</span>
              <span>Delivered</span>
            </div>
          </div>
          <div className=" flex flex-col justify-center gap-5 items-center bg-slate-200 py-14 px-5 rounded-2xl">
            <PiMapPinLight className=" text-5xl" />
            <div className=" flex flex-col items-center text-lg">
              <span className=" font-medium">20000+</span>
              <span>Pincodes Covered</span>
            </div>
          </div>
          <div className=" flex flex-col justify-center gap-5 items-center bg-slate-200 py-14 px-5 rounded-2xl">
            <CiDeliveryTruck className=" text-5xl" />
            <div className=" flex flex-col items-center text-lg">
              <span className=" font-medium">620+ Cities</span>
              <span>Enjoying same-day delivery</span>
            </div>
          </div>
          <div className=" flex flex-col justify-center gap-5 items-center bg-slate-200 py-14 px-5 rounded-2xl">
            <HiOutlineUserGroup className=" text-5xl" />
            <div className=" flex flex-col items-center text-lg">
              <span className=" font-medium">1100+ Skilled</span>
              <span>Chefs & Florists On Board</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
