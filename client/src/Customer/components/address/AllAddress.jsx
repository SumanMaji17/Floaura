import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAddressAction } from "../../../redux/actions/addressActions";
import { TiArrowBack } from "react-icons/ti";

export default function AllAddress() {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddress((prevSelectedAddress) =>
      prevSelectedAddress === selectedValue ? null : selectedValue
    );
  };

  const handleDeleteAddress = () => {
    try {
      if (selectedAddress) {
        dispatch(deleteAddressAction(selectedAddress));
      }
    } catch (error) {
      toast.error("Error while deleteing address.");
    }
  };
  const handleSubmit = () => {
    try {
      if (selectedAddress) {
        navigate("/check-out/payment", {
          state: { addressId: selectedAddress },
        });
      } else {
        toast.warning("Please select an address to continue...");
      }
    } catch (error) {
      toast.error("Error while placing order...");
    }
  };
  return (
    <div className=" p-5 bg-slate-100">
      <div className=" flex justify-between">
        <h1 className=" text-lg font-medium">
          Select Address where to deliver
        </h1>
        <div
          className=" flex items-center gap-2 text-white bg-cyan-900 px-3 py-2 rounded-md cursor-pointer active:bg-cyan-950"
          onClick={() => navigate("/check-out/add-address")}
        >
          <FaPlus />
          <span>Add Address</span>
        </div>
      </div>
      {addresses.map((address) => (
        <div key={address.id} className=" flex flex-col my-3">
          <label className=" flex justify-between p-5 rounded-lg bg-white">
            <div className="flex items-start gap-4">
              <input
                type="radio"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={handleAddressChange}
              />
              <div className=" flex flex-col text-base">
                <span className=" flex gap-4">
                  <span>{address.name}</span>
                  <span className=" bg-gray-200 px-2 py-1 text-xs rounded font-thin">
                    {address.addressType}
                  </span>
                </span>
                <span>
                  {address.addressDetail},{address.city}-{address.pincode}
                </span>
                <span>{address.phoneNumber}</span>
              </div>
            </div>
            <div className=" flex gap-3 text-lg">
              <MdDelete
                className=" cursor-pointer"
                onClick={handleDeleteAddress}
              />
              <FaRegEdit className=" cursor-pointer" />
            </div>
          </label>
        </div>
      ))}
      <div className=" flex gap-5">
        <button
          className="flex items-center gap-1 text-white bg-cyan-900 px-3 py-2 rounded-md cursor-pointer active:bg-cyan-950"
          onClick={() => navigate(-1)}
        >
          <TiArrowBack className=" text-xl" />
          Back
        </button>
        <button
          className="flex justify-center text-white bg-cyan-900 px-3 py-2 rounded-md cursor-pointer active:bg-cyan-950"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
