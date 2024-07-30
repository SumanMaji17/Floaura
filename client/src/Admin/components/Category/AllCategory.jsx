import React, { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteCategoryAction } from "../../../redux/actions/categoryActions";

export default function AllCategory() {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const openDeleteModal = (categoryId) => {
    setDeleteModalOpen(true);
    setSelectedCategoryId(categoryId);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDelete = (categoryId, productCount) => {
    productCount > 0
      ? toast.warning("Cannot delete category with products")
      : openDeleteModal(categoryId);
  };

  const handleConfirmDelete = async (event) => {
    event.preventDefault();

    try {
      if (selectedCategoryId) {
        dispatch(deleteCategoryAction(selectedCategoryId));
      }
    } catch (error) {
      toast.error(error);
    }

    closeDeleteModal();
  };

  return (
    <>
      <div className=" m-10 flex flex-col">
        <div className=" flex justify-between min-w-full">
          <div className=" flex items-center w-[40%] gap-1 bg-slate-200 text-black rounded-full p-2">
            <input
              type="text"
              placeholder="Search by name..."
              className=" pl-3 w-full bg-transparent outline-none placeholder-slate-700"
            />
            <IoIosSearch className=" text-3xl" />
          </div>
          <div
            className=" flex items-center gap-2  p-3 border rounded-lg bg-[#ff9900] hover:bg-[#ffae00] font-semibold text-white  active:bg-[#ff9900] cursor-pointer"
            onClick={() => navigate("/admin/category/add-category")}
          >
            <span>Add New Category</span>
            <FaPlus />
          </div>
        </div>
        <div className=" py-5 text-md text-slate-700">
          <span>Total {categories.length} category</span>
        </div>
        <div className=" grid grid-cols-4 mt-3 border-2 border-black text-white">
          <div className=" bg-slate-900 flex justify-center border-2 border-white p-2">
            <span>ID</span>
          </div>
          <div className=" bg-slate-900 flex justify-center border-2 border-white p-2">
            <span>Category</span>
          </div>
          <div className=" bg-slate-900 flex justify-center border-2 border-white p-2">
            <span>Product</span>
          </div>
          <div className=" bg-slate-900 flex justify-center border-2 border-white p-2">
            <span>Action</span>
          </div>
        </div>
        <div className=" border border-black rounded-lg">
          {categories.map((category) => (
            <div key={category.id} className="bg-slate-300  grid grid-cols-4 ">
              <div className=" flex justify-center border border-black p-3">
                {category.id}
              </div>
              <div className=" flex justify-center border border-black p-3">
                {category.name}
              </div>
              <div className=" flex justify-center border border-black p-3">
                {category.productCount}
              </div>
              <div className=" flex justify-center border border-black p-3 gap-4">
                <FaRegEdit
                  className=" text-2xl cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/category/edit-category/${category.id}`)
                  }
                />
                <MdDelete
                  className=" text-2xl text-rose-700 cursor-pointer"
                  onClick={() =>
                    handleDelete(category.id, category.productCount)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 border border-black rounded-lg">
            <p>Are you sure you want to delete this category?</p>
            <div className=" pt-3 flex justify-around ">
              <button
                className=" bg-red-500 hover:bg-red-600 active:bg-red-500 text-white px-3 py-2 rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className=" bg-slate-400 hover:bg-slate-500 active:bg-slate-400 text-white px-3 py-2 rounded-lg"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
