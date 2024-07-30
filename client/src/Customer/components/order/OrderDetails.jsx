import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { CREATE_ORDER } from "../../../utils/ApiRoutes";

export default function OrderDetails() {
  const location = useLocation();
  const order = location.state?.order;
  const { userInfo } = useSelector((state) => state.user);
  const orderId=order.id;

  const makePayment = async ({ individualPayment }) => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
      const totalPrice = individualPayment;
    
      const response = await axios.post(
        CREATE_ORDER,
        {
          userId: userInfo.id,
          totalPrice,
          orderType: "member",
          orderId,
        },
        {
          withCredentials: true,
        }
      );

      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.log(result.error);
        toast.error("Error while creating payment...");
      }
    } catch (error) {
      toast.error("Error while creating the payment. Please try again...");
      console.log("Error while creating the payment.");
    }
  };

  return (
    <div className=" mx-10">
      <h1 className=" text-3xl font-bold pb-3">Order Details</h1>
      <span className="flex gap-1 font-medium text-xs">
        <Link to={"/"}>
          <span className=" underline text-cyan-900">Home</span>
        </Link>
        <span>&gt;</span>
        <Link to={"/my-orders"}>
          <span className=" underline text-cyan-900">Orders</span>
        </Link>
        <span>&gt;</span>
        <span>Order Details</span>
      </span>
      <h2 className=" text-lg font-medium text-gray-400">
        Order Id: {order?.id}
      </h2>
      <div className=" flex justify-between w-full px-10">
        <div className="">
          {order?.items.map((ord) => (
            <div className=" flex gap-2 border-b-2 py-4" key={ord.itemId}>
              <img
                src={ord.images[0]}
                className="w-[150px] h-[100px] object-fill"
                alt="Product"
              />
              <div className=" flex flex-col gap-2 w-[400px] ">
                <h1 className=" overflow-hidden whitespace-nowrap overflow-ellipsis text-xl font-medium">
                  {ord?.productName}
                </h1>
                <span>Qty: {ord.quantity}</span>
                <span>
                  Rs{" "}
                  {ord.price <= ord.discountedPrice
                    ? ord.price
                    : ord.discountedPrice}
                </span>
              </div>
            </div>
          ))}

          <div className=" flex text-xl font-medium bg-slate-100 p-2 mt-2 rounded-md">
            Total Amount: Rs {order.totalPrice}
          </div>
        </div>
        <div className=" flex flex-col gap-10">
          {order.orderType !== "self" && (
            <div className=" bg-gray-50 bg-opacity-25 p-3 border-2 rounded-lg">
              <h1 className=" text-2xl font-medium">Group Pay Details</h1>
              <div className=" w-[150px] h-[3px] bg-gray-600 my-2 rounded-md"></div>

              <div className=" grid grid-cols-3 border-x-2 mt-5 border-t-2 bg-slate-200 border-cyan-900">
                <span className=" border-r-2 border-cyan-900 p-1 font-medium">
                  Memember Name
                </span>
                <span className=" border-r-2 border-cyan-900 p-1 font-medium">
                  Phone Number
                </span>
                <span className=" font-medium p-1">Payment Status</span>
              </div>
              {order.members.map((member) => (
                <div
                  className=" grid grid-cols-3 border-2 border-cyan-900"
                  key={member.id}
                >
                  <span className=" border-r-2 p-1 border-cyan-900">
                    {member.name}
                  </span>
                  <span className=" border-r-2 p-1 border-cyan-900">
                    {member.phone}
                  </span>
                  <span className=" p-1">{member.paymentStatus}</span>
                </div>
              ))}

              {!order.members.some(
                (member) =>
                  member.memberId === userInfo?.id &&
                  member.paymentStatus === "Paid"
              ) && (
                <div
                  className="bg-cyan-900 text-white font-semibold text-base flex justify-center mt-5 py-2 rounded-md hover:bg-cyan-800 active:bg-cyan-900 cursor-pointer"
                  onClick={() =>
                    makePayment({
                      individualPayment:
                        Math.floor(order.members[0].individualPayment * 100) /
                        100,
                    })
                  }
                >
                  Pay Rs{" "}
                  {Math.floor(order.members[0].individualPayment * 100) / 100}
                </div>
              )}
            </div>
          )}
          <div className=" flex flex-col border-2 bg-gray-50 bg-opacity-25 p-3 w-[400px] rounded-lg">
            <h1 className=" text-2xl font-medium">Shipping Details</h1>
            <div className=" w-[120px] h-[3px] bg-gray-600 my-2 rounded-md"></div>
            <div className=" flex flex-col text-base mt-1 w-[300px]">
              <span className=" flex gap-4">
                <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {order.orderAddress.name}
                </span>
                <span className=" bg-gray-200 px-2 py-1 text-xs rounded font-thin">
                  {order.orderAddress.addressType}
                </span>
              </span>
              <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {order.orderAddress.addressDetail},{order.orderAddress.city}-
                {order.orderAddress.pincode}
              </span>
              <span>{order.orderAddress.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
