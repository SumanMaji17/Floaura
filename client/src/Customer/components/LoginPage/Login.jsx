import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  generateOtpAction,
  userLoginAction,
  userPasswordVerificationAction,
} from "../../../redux/actions/userAction";
import { reducerCases } from "../../../redux/constants/userConstants";
import OtpVerification from "./OtpVerification";

export default function Login({ onLoginSuccess }) {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const { userPassSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      userPassSuccess &&
      userPassSuccess.email &&
      userPassSuccess.phone &&
      !otpGenerated
    ) {
      const otpGenerateStatus = generateOtpAction({
        email: userPassSuccess.email,
        phone: userPassSuccess.phone,
      });

      if (otpGenerateStatus) {
        setFormData({ phone: userPassSuccess.phone });
        setCurrentComponent(currentComponent + 1);
        setOtpGenerated(true);
      }
    }
  }, [userPassSuccess, otpGenerated]);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      if (email && password) {
        dispatch({ type: reducerCases.SET_USER_EMAIL, payload: email });
        dispatch(userPasswordVerificationAction({ email, password }));
      } else {
        toast.warning("All fields are required...");
      }
    } catch (err) {
      console.log("Error while login..." + err);
    }
  };

  return (
    <div>
      {currentComponent === 1 && (
        <>
          <div className=" pt-5">
            <h1 className="text-3xl text-center font-bold">Hello!</h1>
          </div>
          <div className="w-full mt-4 h-full">
            <h1>Please enter you email</h1>
            <div className=" w-3/4 mx-auto">
              <div className="flex flex-col mt-4">
                <input
                  type="text"
                  className="flex-grow px-3 py-1  placeholder:px-1 placeholder:py-1 placeholder:text-lg border rounded border-gray-400 text-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  type="password"
                  className="flex-grow px-3 py-1  placeholder:px-1 placeholder:py-1 placeholder:text-lg border rounded border-gray-400 text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-8">
                <button
                  type="submit"
                  onClick={handleLogin}
                  className=" bg-cyan-900 hover:bg-cyan-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg"
                >
                  Continue
                </button>
              </div>
              <div className="text-center mt-5 flex flex-col gap-1">
                <span>Or, Login with</span>
                <button
                  type="button"
                  className=" border border-gray-400 hover:bg-cyan-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                  <FcGoogle className=" text-xl" />
                  Google<div className=" pr-4"></div>
                </button>
              </div>
            </div>
            <div className=" pt-5 pl-2 text-xs text-gray-500">
              <p>
                by continuing I agree to FloAura's Terms & Condition and Privacy
                and Policy
              </p>
            </div>
          </div>
        </>
      )}
      {currentComponent === 2 && (
        <OtpVerification
          userLoginData={formData}
          onLoginSuccess={onLoginSuccess}
        />
      )}
    </div>
  );
}
