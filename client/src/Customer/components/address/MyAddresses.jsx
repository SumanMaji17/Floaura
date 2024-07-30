import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAddressAction } from "../../../redux/actions/addressActions";
import { toast } from "react-toastify";

export default function MyAddresses() {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDeleteAddress = (selectedAddress) => {
    try {
      if (selectedAddress) {
        dispatch(deleteAddressAction(selectedAddress));
      }
    } catch (error) {
      toast.error("Error while deleteing address.");
    }
  };

  return (
    <div className=" mx-10">
      <div className=" flex justify-between mb-8">
        <h1 className=" text-3xl font-bold">Manage Adress</h1>
        <button className=" font-bold py-3 px-8 rounded-xl border-2 border-slate-800 transition-colors ease-in delay-150 duration-150 text-white  bg-cyan-950 hover:bg-opacity-90">
          Add Address
        </button>
      </div>
      {addresses.length === 0 ? (
        <div className=" flex flex-col justify-center items-center">
          <img src="Address.jpg" className=" w-[250px]" alt="no-address" />
          <h1 className=" text-lg font-medium py-4 rounded-md bg-gray-100 border text-gray-500 w-[50%] text-center">
            You have'nt added any address yet
          </h1>
        </div>
      ) : (
        <div className=" flex">
          {addresses.map((address) => (
            <div
              className=" flex justify-between w-[70%] bg-slate-50 border-2 py-5 px-10"
              key={address.id}
            >
              <div className=" flex flex-col text-lg">
                <span className=" flex gap-4">
                  <span className=" text-xl font-semibold">{address.name}</span>
                  <span className=" bg-gray-200 px-2 py-1 text-xs rounded font-thin">
                    {address.addressType}
                  </span>
                </span>
                <span>
                  {address.addressDetail},{address.city}-{address.pincode}
                </span>
                <span>{address.phoneNumber}</span>
              </div>

              <div className=" flex gap-3 text-2xl">
                <MdDelete
                  className=" cursor-pointer"
                  onClick={handleDeleteAddress(address.id)}
                />
                <FaRegEdit className=" cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
