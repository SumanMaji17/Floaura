import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { searchTermAction } from "../../redux/actions/userAction";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(searchTermAction(searchTerm));
  }, [searchTerm, dispatch]);
  

  return (
    <div className=" flex items-center gap-1 bg-slate-100 text-black rounded-full p-2 border border-slate-300">
      <input
        type="text"
        placeholder="Search..."
        className=" pl-3 w-64 bg-transparent outline-none placeholder-slate-700 placeholder:font-medium"
        onChange={handleChange}
        value={searchTerm}
      />
      <IoIosSearch className=" text-3xl" />
    </div>
  );
}
