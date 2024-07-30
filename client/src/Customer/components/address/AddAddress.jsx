import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAddress } from "../../../redux/actions/addressActions";

export default function AddAddress({ onAddressSelect }) {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [addressType, setAddressType] = useState("Home");
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    address: "",
    pinCode: "",
    city: "",
    countryCode: "+91",
    phoneNumber: "",
  });

  const titles = ["Mr.", "Ms.", "Mrs.", "Others"];
  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    // Add more country codes as needed
  ];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    
   try {
    
    if (
      formData.name &&
      formData.address &&
      formData.city &&
      formData.countryCode &&
      formData.phoneNumber &&
      formData.pinCode &&
      formData.title
    ) {
      const address = {
        userId: userInfo.id,
        name: formData.title+' '+formData.name ,
        addressDetail: formData.address,
        city: formData.city,
        phoneNumber: formData.countryCode+formData.phoneNumber,
        pinCode: formData.pinCode,
        addressType
      };
      console.log(address);
      dispatch(createAddress(address));
      if(addresses.length>0){
        navigate("/check-out")
      }else{
        navigate("/check-out/payment",{ state: { address } })
      }
      
    }
    else{
      toast.warning("All fields are required...");
    }
   } catch (error) {
    console.log(error)
   }
    // navigate("/check-out/payment");
    // console.log(addressType);
    // onAddressSelect();
  };

  return (
    <div
      className=" bg-slate-100 w-full px-10 py-5"
      style={{ boxShadow: "8px 10px 12px -7px rgba(0,0,0,0.12)" }}
    >
      <h1 className=" text-lg font-semibold pb-10">
        Awesome {userInfo.name} ! Let us know where to deliver
      </h1>
      <div className=" flex flex-col w-[80%] gap-3">
        <div className=" flex gap-5">
          <div className=" flex flex-col">
            <h1>Title</h1>
            <select
              id="title"
              name="title"
              onChange={handleChange}
              className="mt-1 px-5 py-2 w-full border rounded-md border-gray-400 focus:outline-cyan-700 "
              required
            >
              <option value="">Select Title</option>
              {titles.map((title) => (
                <option key={title} value={title} className=" px-4 py-2">
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col gap-1">
            <span>Name*</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className=" px-5 py-2 rounded-md border border-gray-400 focus:outline-cyan-700"
              required
            />
          </div>
        </div>
        <div className=" flex flex-col gap-1">
          <span>Address*</span>
          <textarea
            rows={4}
            name="address"
            onChange={handleChange}
            value={formData.address}
            placeholder="Full Address"
            required
            className=" px-5 py-2 rounded-md border border-gray-400 focus:outline-cyan-700"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <span>Pincode*</span>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className=" px-5 py-2 rounded-md border border-gray-400 focus:outline-cyan-700 "
          />
        </div>
        <div className=" flex flex-col gap-1">
          <span>City*</span>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className=" px-5 py-2 rounded-md border border-gray-400 focus:outline-cyan-700 "
          />
        </div>
        <div className=" flex gap-5">
          <div className=" flex flex-col">
            <h1>Country Code</h1>
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full border rounded-md border-gray-400 focus:outline-cyan-700"
              required
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {`${country.code} (${country.name})`}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col gap-1">
            <span>Phone Number*</span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className=" px-5 py-2 rounded-md border border-gray-400 focus:outline-cyan-700 "
            />
          </div>
        </div>
        <div className=" flex flex-col gap-1">
          <span>Address Type</span>
          <div className=" flex gap-3">
            <span
              className={` ${
                addressType === "Home" ? "border-2 border-cyan-900" : "border-2"
              } px-4 py-2 cursor-pointer rounded-md`}
              onClick={() => setAddressType("Home")}
            >
              Home
            </span>
            <span
              className={` ${
                addressType === "Office"
                  ? "border-2 border-cyan-900"
                  : "border-2"
              } px-4 py-2 cursor-pointer rounded-md`}
              onClick={() => setAddressType("Office")}
            >
              Office
            </span>
            <span
              className={` ${
                addressType === "Work" ? "border-2 border-cyan-900" : "border-2"
              } px-4 py-2 cursor-pointer rounded-md`}
              onClick={() => setAddressType("Work")}
            >
              Work
            </span>
          </div>
        </div>
        <div
          className="flex justify-center text-white bg-cyan-900 px-3 py-2 rounded-md cursor-pointer active:bg-cyan-950"
          onClick={handleSubmit}
        >
          Continue
        </div>
      </div>
    </div>
  );
}
