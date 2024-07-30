import React, { useState, useRef } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserAction,
  registerUserAction,
  verifyOtpAction,
} from "../../../redux/actions/userAction";
import { toast } from "react-toastify";
import { fetchAllCategory } from "../../../redux/actions/categoryActions";

export default function OtpVerification({
  user,
  userLoginData,
  onLoginSuccess,
}) {
  const dispatch = useDispatch();

  const { email, loginError } = useSelector((state) => state.user);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const phoneOtpInputRefs = useRef([]);
  const emailOtpInputRefs = useRef([]);
  const phone = userLoginData
    ? userLoginData.phone
    : user.countryCode + user.phoneNumber;
  const name = user?.title + " " + user?.name;

  const handleChange = (otpType, index, value) => {
    if (otpType === "phone") {
      const newOtp = [...phoneOtp];
      newOtp[index] = value;
      setPhoneOtp(newOtp);
    } else if (otpType === "email") {
      const newOtp = [...emailOtp];
      newOtp[index] = value;
      setEmailOtp(newOtp);
    }

    // Move focus to the next input field after entering a digit
    if (
      value !== "" &&
      index < (otpType === "phone" ? phoneOtp.length : emailOtp.length) - 1
    ) {
      otpType === "phone"
        ? phoneOtpInputRefs.current[index + 1].focus()
        : emailOtpInputRefs.current[index + 1].focus();
    }

    if (value === "" && index > 0) {
      // Clear the previous character
      if (otpType === "phone") {
        const newOtp = [...phoneOtp];
        newOtp[index] = "";
        setPhoneOtp(newOtp);
      } else {
        const newOtp = [...emailOtp];
        newOtp[index] = "";
        setEmailOtp(newOtp);
      }

      otpType === "phone"
        ? phoneOtpInputRefs.current[index - 1].focus()
        : emailOtpInputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async (otpType, otp) => {
    try {
      const enteredOTP = otp.join("");
      if (otpType === "phone") {
        const response = await verifyOtpAction({
          phone: phone,
          otp: enteredOTP,
        });

        if (response) {
          setPhoneVerified(true);
        } else {
          setPhoneVerified(false);
        }
      } else if (otpType === "email") {
        const response = await verifyOtpAction({
          email: email,
          otp: enteredOTP,
        });

        if (response) {
          setEmailVerified(true);
        } else {
          setEmailVerified(false);
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error); // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (emailVerified && phoneVerified) {
        if (loginError==="Unauthorized") {
          dispatch(
            registerUserAction({ email, name, password: user.password, phone })
          );
          toast.success("Registration Successfull...");
          toast.info("Please re-login Again...");
        } else {
          dispatch(loginUserAction(email));
          toast.success("Login Successfully....");
          onLoginSuccess();
        }
      } else {
        toast.error("Please verify you email and phone otp...");
      }
    } catch (err) {
      console.log("Error while verification...."+err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <h1 className=" font-bold text-lg underline">
        Two-Step Verification (2FA)
      </h1>
      <div className="bg-white p-5 rounded">
        <div className=" flex justify-between text-xl text-gray-500">
          <h2 className="text-sm  mb-4">
            Enter OTP send to your phone number.
          </h2>
          <FaCircleCheck
            className={`${phoneVerified ? "text-green-500" : "text-gray-300"}`}
          />
        </div>
        <div className="flex justify-between gap-1">
          {phoneOtp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (phoneOtpInputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-2xl border border-gray-300 rounded text-center focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange("phone", index, e.target.value)}
            />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleVerifyOTP("phone", phoneOtp)}
        >
          Verify OTP
        </button>
      </div>
      <div className=" h-[3px] bg-gray-100 w-full"></div>
      <div className="bg-white p-8 rounded">
        <div className=" flex justify-between text-xl text-gray-500">
          <h2 className="text-sm  mb-4">Enter OTP send to your Email.</h2>
          <FaCircleCheck
            className={`${emailVerified ? "text-green-500" : "text-gray-300"}`}
          />
        </div>
        <div className="flex justify-between gap-1">
          {emailOtp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (emailOtpInputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              className="w-12 h-12 text-2xl border border-gray-300 rounded text-center focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange("email", index, e.target.value)}
            />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleVerifyOTP("email", emailOtp)}
        >
          Verify OTP
        </button>
      </div>
      <div className=" bg-white">
        <button
          className=" bg-cyan-900 hover:bg-cyan-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
