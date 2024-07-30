import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EditProfileAction } from "../../redux/actions/userAction";

export default function EditProfile() {
  const { userInfo } = useSelector((state) => state.user);
  const [newName, setNewName] = useState(userInfo?.name || "");
  console.log(newName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = () => {
    try {
      if (newName.length === 0) {
        toast.error("Please enter a valid name...");
      } else {
        dispatch(EditProfileAction(newName));
        navigate("/");
      }
    } catch (error) {
      console.log("Error while saving...");
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center gap-5">
      <h1 className=" font-bold text-2xl">Edit Profile </h1>
      <div className=" flex flex-col w-[40%] gap-3 bg-slate-100 p-5 border-2 rounded-2xl">
        <div className="flex flex-col gap-2">
          <span className=" font-bold text-lg">Name</span>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className=" border px-3 py-2 focus:outline-none rounded-lg"
          />
        </div>
        <div
          className=" text-center my-3 bg-cyan-900 text-white w-[40%] py-2 rounded-md cursor-pointer"
          onClick={handleSave}
        >
          Save Changes
        </div>
        <div className=" flex flex-col gap-2">
          <span className=" font-bold text-lg">Mobile Number</span>
          <span>{userInfo.phone}</span>
        </div>
        <div className=" flex flex-col gap-2">
          <span className=" font-bold text-lg">Email Id</span>
          <span>{userInfo.email}</span>
        </div>
        <div className=" text-center my-3 bg-cyan-900 text-white w-[40%] py-2 rounded-md">
          Delete Account
        </div>
      </div>
    </div>
  );
}
