import React, { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SubTotal({ total }) {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  
  const handleLoginSuccess = () => {
    setLogin(false);
  };

  const handlePlaceOrder = () => {
    try {
      if (userInfo) {
       navigate("/check-out");
      } else {
        setLogin(true)
      }
    } catch (error) {
      console.log("Error while placing order..");
    }
  };

  return (
    <>
      <div className=" flex flex-col   px-10 py-5 rounded-2xl shadow-[0_0_8px_0] shadow-slate-400">
        <h1 className=" text-2xl font-semibold">Cart Summary</h1>
        <span className=" text-lg font-medium text-stone-500">Grand Total</span>
        <span>
          Rs <span>{total}</span>
        </span>
        <div
          className=" flex items-center justify-center w-72 h-12 m-3 border-cyan-900 bg-cyan-900 border-[1px] text-white font-medium rounded-md cursor-pointer"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </div>
      </div>
      {isLogin && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden"
          onClick={() => setLogin(false)}
        >
          <div
            className="flex rounded-lg shadow-lg w-full h-[550px] sm:w-3/4 lg:w-7/12 bg-white sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
