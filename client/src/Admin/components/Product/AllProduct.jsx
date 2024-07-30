import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "../../../common/DropDown/DropDown";
import Search from "../../../common/search/Search";

export default function AllProduct() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const { searchTerm } = useSelector((state) => state.user);
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const handleSelect = (selectedCategorys) => {
    setCategory(selectedCategorys);
  };

  useEffect(() => {
    let filteredProducts = [];
    if (category.length>0 || searchTerm.trim() !== "") {
      
      if (category.length>0) {
        const categoryIdsToFilter = categories
          .filter((cat) => category.includes(cat.name))
          .map((cat) => cat.id);

        filteredProducts = products.filter((product) =>
          product.categories
            .map((category) => category.categoryId)
            .some((categoryId) => categoryIdsToFilter.includes(categoryId))
        );
      }

      if (searchTerm.trim() !== "") {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      setFilterProduct(filteredProducts);
    } else {
      setFilterProduct([]);
    }
  }, [category, searchTerm,categories,products]);

  return (
    <div className=" m-10 flex flex-col">
      <div className=" flex min-w-full">
        <div className=" flex items-center flex-row gap-9 w-[80%]">
          <Search />

          <div className=" w-[50%] flex flex-col">
            <span className=""></span>
            <Dropdown options={categories} onSelect={handleSelect} />
          </div>
        </div>
        <div
          className=" flex items-center gap-2  p-3 border rounded-lg bg-[#ff9900] hover:bg-[#ffae00] font-semibold text-white  active:bg-[#ff9900] cursor-pointer"
          onClick={() => navigate("/admin/products/add-product")}
        >
          <span>Add New Product</span>
          <FaPlus />
        </div>
      </div>
      <div className=" py-5 text-md text-slate-700">
        <span>Total {products.length} products</span>
      </div>
      <div className=" grid grid-cols-3">
        {filterProduct.length > 0
          ? filterProduct.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
