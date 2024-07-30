import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCategoryAction } from "../../../redux/actions/categoryActions";

export default function EditCategory() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [count,setCount] = useState(null);

  const error = useSelector((state) => state.category.error);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === categoryId);

    if (category) {
      setCategoryName(category.name);
      setCount(category.productCount)
    }
  }, [categoryId, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(count>0){
        toast.warning("Cannot edit category with product...");
      }
      if (categoryName && count===0) {
        dispatch(updateCategoryAction({categoryName,categoryId}));
        if(!error){
          navigate("/admin/category/all-category");
        }
        toast.error(error);
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  return (
    <div className="flex items-start justify-start m-10 h-full ">
      <div className="w-[50%] h-[50%] p-5 border bg-white border-gray-300 shadow-[0_0_8px_0] shadow-slate-400 rounded-xl">
        <div className="justify-between text-4xl">Edit Category</div>
        <div className=" border-t-2 border-gray-300 my-4"></div>
        <div className="px-3 py-0 text-small text-default-400 flex flex-col gap-10">
          <div className="flex flex-col w-[50%]">
            <div className=" font-normal py-3">Category Name</div>
            <input
              type="text"
              label="Category Name"
              className=" border border-gray-400 rounded p-2 outline-gray-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-48 text-white bg-orange-400 hover:bg-amazon-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleSubmit}
          >
            Save Category
          </button>
        </div>
        <div className="gap-3"></div>
      </div>
    </div>
  );
}
