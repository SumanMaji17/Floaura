import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaShieldAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";

export default function Advantage() {
  return (
    <div className=" bg-slate-300 flex flex-col justify-center p-10 my-10 rounded-full mx-5">
      <div className=" flex justify-center text-slate-800">
        <h1 className=" text-4xl font-bold pb-16">Our Advantage</h1>
      </div>
      <div className=" flex justify-around">
        <div className=" flex items-center gap-5">
          <FaShippingFast className=" text-4xl" />
          <div>
            <h1 className=" font-bold text-lg">Express Delivery</h1>
            <h2 className=" font-serif text-sm">Ship in 24 Hours</h2>
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <FaShieldAlt className=" text-4xl" />
          <div>
            <h1 className=" font-bold text-lg">Brand Warranty</h1>
            <h2 className=" font-serif text-sm">100% Original Product</h2>
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <FaTags className=" text-4xl" />
          <div>
            <h1 className=" font-bold text-lg">Exciting Deals</h1>
            <h2 className=" font-serif text-sm">On All prepaid orders</h2>
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <FaCreditCard className=" text-4xl" />
          <div>
            <h1 className=" font-bold text-lg">Secure Payments</h1>
            <h2 className=" font-serif text-sm">SSL/Secure Certificate</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
