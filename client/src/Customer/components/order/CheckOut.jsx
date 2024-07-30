import React, { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import AddAddress from "../address/AddAddress";
import PaymentSummary from "../payment/PaymentSummary";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CheckOut() {
  const [openModal, setOpenModal] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/check-out/payment") {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [location.pathname]);

  // const handleAddressSelect = () => {
  //   setOpenModal(false);
  // };
  return (
    <div className=" flex flex-col text-sm items-center justify-center gap-5 py-5">
      <div className=" flex items-center font-medium bg-slate-100 p-5 w-[70%] shadow-sm drop-shadow-xl">
        <div className=" pr-20 flex gap-2 items-start justify-start">
          <FaRegAddressCard className=" text-4xl text-cyan-900" />
          <div>
            <h1 className="">Login Details</h1>
            <span className=" text-gray-500">Step 1/3</span>
          </div>
        </div>
        <div className=" px-10">
          <h1 className=" text-gray-500">Full Name</h1>
          <span className=" ">{userInfo.name}</span>
        </div>
        <div className=" w-[2px] h-4 bg-slate-600"></div>
        <div className=" px-10 ">
          <h1 className=" text-gray-500">Phone Number</h1>
          <span>{userInfo.phone}</span>
        </div>
        <div className=" w-[2px] h-4 bg-slate-600"></div>
        <div className=" px-10">
          <h1 className=" text-gray-500">E-Mail ID</h1>
          <span>{userInfo.email}</span>
        </div>
      </div>
      <div className=" flex  w-[70%]">
        <div className=" flex flex-col gap-5 w-[50%] font-medium">
          <div
            className={` flex items-center gap-2  bg-slate-100 px-3 py-5  ${
              openModal ? " border-b-2 border-cyan-900" : "mr-4"
            } `}
            style={{ boxShadow: "-1px 8px 15px 0px rgba(0,0,0,0.12)" }}
          >
            <FaLocationDot className="text-3xl text-cyan-900" />
            <div>
              <h1>Delivery Address</h1>
              <span className=" text-gray-500">Step 2/3</span>
            </div>
          </div>
          <div
            className={` flex items-center gap-2  bg-slate-100 px-3 py-5  ${
              !openModal ? " border-b-2 border-cyan-900" : "mr-4 opacity-60"
            } `}
            style={{ boxShadow: "-1px 8px 15px 0px rgba(0,0,0,0.12)" }}
          >
            <HiOutlineCurrencyRupee className="text-4xl font-bold text-cyan-900" />
            <div>
              <h1>Payment & Order Summary</h1>
              <span className=" text-gray-500">Step 3/3</span>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <Outlet />
        </div>
        {/* {openModal && (
            <AddAddress  />
        )}
        {!openModal && (
          
            <h1 className=" text-lg font-semibold pb-10">
             Order Summmary
            </h1>
            <PaymentSummary />
          </div>
        )} */}
      </div>
    </div>
  );
}
