import React, { useEffect, useState } from "react";
import Cards from "../../../common/Product/Cards";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const products = useSelector((state) => state.product.products);
  const { searchTerm } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.category.categories);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selected) => selected !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  let minPrice =
    products[0]?.price <= products[0]?.discountedPrice
      ? products[0]?.price
      : products[0]?.discountedPrice;
  let maxPrice =
    products[0]?.price <= products[0]?.discountedPrice
      ? products[0]?.price
      : products[0]?.discountedPrice;

  products.forEach((product) => {
    const originalPrice =
      product?.price <= product?.discountedPrice
        ? product?.price
        : product?.discountedPrice;
    if (originalPrice < minPrice) {
      minPrice = originalPrice;
    }
    if (originalPrice > maxPrice) {
      maxPrice = originalPrice;
    }
  });

  useEffect(() => {
    let filteredProducts = products;

    if (selectedOptions.length > 0) {
      const categoryIdsToFilter = categories
        .filter((cat) => selectedOptions.includes(cat.name))
        .map((cat) => cat.id);

      filteredProducts = filteredProducts.filter((product) =>
        product.categories
          .map((category) => category.categoryId)
          .some((categoryId) => categoryIdsToFilter.includes(categoryId))
      );
    }

    if (searchTerm !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterProducts(filteredProducts);
  }, [selectedOptions, searchTerm, products, categories]);

  return (
    <div className=" flex flex-col min-w-full h-full">
      <div className=" px-14 pb-5 flex flex-col gap-1">
        <h2 className=" text-black text-2xl font-semibold">
          Best Sellers: Flowers, Cakes, Gifts and Plants
        </h2>
        <div className=" ">
          <span className="flex gap-1 font-medium text-xs">
            <Link to={"/"}>
              <span className=" underline text-cyan-900">Home</span>
            </Link>

            <span>&gt;</span>
            <span>Best Seller</span>
          </span>
          <span className=" flex justify-end text-[10px] text-gray-600">
            Total Items {products.length} | Ranging From Rs.{minPrice} to Rs.
            {maxPrice}
          </span>
        </div>
      </div>
      <div className=" bg-slate-200 h-full py-8 px-10 mx-8 rounded-3xl">
        <div className=" grid grid-cols-8 text-center w-full gap-3 mb-5">
          {categories.map((category) => (
            <div
              className={`border-slate-400 border-[1px] p-2 rounded-lg cursor-pointer ${
                selectedOptions.includes(category.name)
                  ? " bg-cyan-900 text-white hover:bg-cyan-800 hover:border-slate-500 active:bg-cyan-950 "
                  : " bg-slate-50 hover:bg-slate-200 "
              }`}
              onClick={() => handleSelect(category.name)}
              key={category.id}
            >
              {category.name}
            </div>
          ))}
        </div>
        {filterProducts.length === 0 ? (
          <div className=" flex flex-col justify-center items-center gap-3">
            <img src="no-product.png" alt="No product found" className=" w-[150px] h-[150px]" />
            <div className=" flex flex-col justify-center items-center">
              <h1 className=" text-3xl font-bold">No Products Found</h1>
              <span className=" text-gray-500 text-sm font-semibold">Your search did not match any products.</span>
              <span className=" text-gray-500 text-sm font-semibold ">Please try again</span>
            </div>
          </div>
        ) : (
          <div className=" grid grid-cols-4">
            {filterProducts.map((product) => (
              <Cards product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
