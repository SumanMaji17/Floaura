import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartAction } from "../../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

export default function PaymentSucces() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('sessionId');
    if(sessionId){
      dispatch(clearCartAction());
      setTimeout(()=> navigate('/my-orders'),3000)
    }
  },[location])
  return (
    <div className=" flex flex-col justify-center items-center gap-3">
      <div className=" flex flex-col justify-center items-center">
        <img src="Sucess.png" className=" w-[27%]" />
        <h1 className=" text-2xl font-bold">Your Order Has Been Placed Successfully!</h1>
      </div>
      <div className=" flex flex-col justify-center items-center text-gray-500">
        <span>
          Within moments you will receive SMS with the receipt of your purchase.
        </span>
        <span>You are being redirected to the orders page.</span>
        <span>Please do not close the page.</span>
      </div>
    </div>
  );
}
