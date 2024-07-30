import React, { useState } from "react";
import OtpVerification from "./OtpVerification";
import { toast } from "react-toastify";
import { generateOtpAction } from "../../../redux/actions/userAction";
import { useSelector } from "react-redux";

export default function Register() {
  const email = useSelector((state) => state.user.email);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    countryCode: "+91",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [currentComponent, setCurrentComponent] = useState(1);
  const titles = ["Mr.", "Ms.", "Mrs.", "Others"];
  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    // Add more country codes as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextClick = async () => {
    if (
      formData.title &&
      formData.name &&
      formData.confirmPassword &&
      formData.password &&
      formData.countryCode &&
      formData.phoneNumber
    ) {
      const phoneNumber = formData.countryCode + formData.phoneNumber;
      const otpGenerateStatus = await generateOtpAction({
        email,
        phone: phoneNumber,
      });
    
      if (otpGenerateStatus) {
        setCurrentComponent(currentComponent + 1);
      } else {
        toast.warning("Please try again...");
      }
    } else {
      toast.warning("All fields are required...");
    }
  };
  return (
    <div>
      {currentComponent === 1 && (
        <>
          <div className=" pt-5">
            <h1 className="text-3xl text-center font-bold">Hello!</h1>
          </div>
          <div className="flex items-center justify-center">
            <div className=" w-full sm:w-96">
              <div className=" py-2">
                <h1 className="text-xs text-gray-500">
                  Please enter your name, phone number & password.
                </h1>
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                    required
                  >
                    <option value="">Select Title</option>
                    {titles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="username"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Country Code
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                    required
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {`${country.code} (${country.name})`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="mt-1 p-1 w-full border rounded focus:outline-none focus:ring focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex flex-col mt-8 justify-center items-center">
                <button
                  type="submit"
                  className=" bg-cyan-900 w-56 drop-shadow-xl hover:bg-cyan-700 active:bg-cyan-900 text-white text-sm font-medium py-2.5 px-5 rounded-lg"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
              <div className=" pt-5 pl-2 text-xs text-gray-500">
                <p>
                  by continuing I agree to FloAura's Terms & Condition and
                  Privacy and Policy
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {currentComponent === 2 && <OtpVerification user={formData}  />}
    </div>
  );
}
