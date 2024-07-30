import React from "react";

export default function Footer() {
  return (
    <div className=" flex justify-around bg-slate-200 p-10">
      <div className="flex flex-col max-w-[40%] gap-3">
        <span className=" text-3xl font-extrabold">FLOAURA</span>
        <span className=" text-lg">
          Subscribe to our Email alerts to receive early discount offers, and
          new products info.
        </span>
        <input type="text" placeholder="Email Address*" className=" p-2 outline-none"/>
        <div className=" bg-cyan-900 flex w-48 p-3 text-white rounded-lg justify-center text-lg font-medium">
          Subcribe
        </div>
      </div>
      <div className=" flex gap-10 text-lg ">
        <div className=" flex flex-col gap-3">
          <span>About Us</span>
          <span>Sell With Us</span>
          <span>Coupons & Deals</span>
          <span>Cancellation & Refund</span>
          <span>Terms & Condition</span>
          <span>Investor Relations</span>
          <span>Retails Stores</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>Career</span>
          <span>Media</span>
          <span>Privacy Policy</span>
          <span>Reviews</span>
          <span>Blogs</span>
          <span>Quotes</span>
        </div>
        <div className="flex flex-col gap-3">
          <span>INR</span>
          <span>Corporate Gifts</span>
          <span>Franchise</span>
          <span>FAQ</span>
          <span>Contact Us</span>
          <span>WhatsApp</span>
        </div>
      </div>
    </div>
  );
}
