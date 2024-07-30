import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../redux/actions/orderAction";
import { Link, useNavigate } from "react-router-dom";

export default function Order() {
  const [orderType, setOrderType] = useState("self");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchAllOrders());
    }
  }, [orders.length, dispatch]);

  const filteredOrders = orders.filter(
    (order) => order.orderType === orderType
  );

  return (
    <div className=" mx-10">
      <h1 className=" text-3xl font-bold pb-3">My Orders</h1>
      <span className="flex gap-1 font-medium text-xs">
        <Link to={"/"}>
          <span className=" underline text-cyan-900">Home</span>
        </Link>
        <span>&gt;</span>
        <span>Orders</span>
      </span>
      <div className=" flex items-center justify-between bg-slate-200 p-2 rounded-full gap-2 text-gray-500 font-medium my-4">
        <div
          className={` flex justify-center items-center ${
            orderType === "self" &&
            "bg-white text-black font-semibold border-2 border-slate-500"
          } w-1/2 p-2 rounded-full`}
        >
          <span
            className="flex items-center justify-center  w-[150px] cursor-pointer"
            onClick={() => setOrderType("self")}
          >
            Self Orders
          </span>
        </div>
        <div
          className={` flex justify-center items-center w-1/2 p-2 rounded-full ${
            orderType === "group" &&
            "bg-white text-black font-semibold border-2 border-slate-500"
          }`}
        >
          <span
            className="flex items-center justify-center  w-[150px] cursor-pointer"
            onClick={() => setOrderType("group")}
          >
            Group Orders
          </span>
        </div>
        {/* <div
          className={` flex justify-center items-center w-1/3 p-2 rounded-full ${
            orderType === "cancelled" && "bg-white text-black font-semibold"
          } `}
        >
          <span
            className="flex items-center justify-center  w-[150px] cursor-pointer"
            onClick={() => setOrderType("cancelled")}
          >
            Cancelled Orders
          </span>
        </div> */}
      </div>
      <div className=" mt-10 flex flex-col justify-center items-center gap-5">
        {filteredOrders.length === 0 ? (
          <div className=" flex justify-center items-center bg-slate-100 rounded-2xl w-[50%]">
            <img src="NoOrder.svg" className=" w-[100px]" alt="No order" />
            <span className=" text-xl font-medium">
              You haven't add any order yet
            </span>
          </div>
        ) : (
          <>
            {filteredOrders.map((order, id) => (
              <div
                className=" flex w-[60%]  rounded-xl overflow-hidden border-2 "
                key={id}
              >
                <img
                  src={order.items[0].images[0]}
                  className="w-[200px] h-[200px] object-fill border-r cursor-pointer"
                  alt="Product"
                  onClick={() =>
                    navigate("/order-details", {
                      state: { order: order },
                    })
                  }
                />

                <div className="flex justify-between w-full bg-gray-50 hover:bg-gray-100  transition-colors duration-200 delay-200">
                  <div className=" flex flex-col h-full  p-5 w-[480px] justify-between overflow-hidden">
                    <div
                      className=" flex flex-col cursor-pointer"
                      onClick={() =>
                        navigate("/order-details", {
                          state: { order: order },
                        })
                      }
                    >
                      <span>Order Id: {order.id}</span>
                      <p className=" text-2xl font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {order.items.map((item) => item.productName).join(", ")}
                      </p>
                      <span className=" text-lg">Rs {order.totalPrice}</span>
                    </div>
                    <div className=" pt-5">
                      <span
                        className=" text-sm text-blue-700 underline cursor-pointer"
                        onClick={() =>
                          navigate("/create-review", {
                            state: { order: order },
                          })
                        }
                      >
                        Write a Review
                      </span>
                    </div>
                  </div>

                  <div
                    className=" flex justify-center items-center p-3 cursor-pointer"
                    onClick={() =>
                      navigate("/order-details", {
                        state: { order: order },
                      })
                    }
                  >
                    <IoIosArrowForward className=" text-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
