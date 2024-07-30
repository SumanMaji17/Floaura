import React, { useState } from "react";
import CommonLoading from "../../../common/loader/CommonLoading";
import { useNavigate } from "react-router-dom";
import { createCategoryAction } from "../../../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddCategory() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.category.error);

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (event) => {
    event.preventDefault();

    try {
      if (category) {
        setLoading(true);
        dispatch(createCategoryAction(category));
        if(!error){
          navigate("/admin/category/all-category");
        }
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <CommonLoading />
      ) : (
        <div className="flex items-start justify-start m-10 h-full ">
          <div className="w-[50%] h-[50%] p-5 border bg-white border-gray-300 shadow-[0_0_8px_0] shadow-slate-400 rounded-xl">
            <div className="justify-between text-4xl">Add Category</div>
            <div className=" border-t-2 border-gray-300 my-4"></div>
            <div className="px-3 py-0 text-small text-default-400 flex flex-col gap-10">
              <div className="flex flex-col w-[50%]">
                <div className=" font-normal py-3">Category Name</div>
                <input
                  type="email"
                  label="Category Name"
                  className=" border border-gray-400 rounded p-2 outline-gray-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-48 text-white bg-orange-400 hover:bg-amazon-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleClick}
              >
                Add Category
              </button>
            </div>
            <div className="gap-3"></div>
          </div>
        </div>
      )}
    </>
  );
}
