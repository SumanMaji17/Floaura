import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../../common/PageNotFound/PageNotFound";
import Banner from "../Banner/Banner";
import categorysData from "../../data/categorysData.json";
import data from "../../data/data.json";
import CategoryCard from "../categoryCard/CategoryCard";
import { useSelector } from "react-redux";
import Cards from "../../../common/Product/Cards";

export default function ProductPageByCategory() {
  const products = useSelector((state) => state.product.products);
  const { searchTerm } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.category.categories);
  const [filterProducts, setFilterProducts] = useState([]);
  const { categoryTitle } = useParams();
  const corporate = "Corporate Gifts";
  const categoryExists =
    categorysData.some(
      (category) => category.title.toLowerCase() === categoryTitle.toLowerCase()
    ) ||
    categories.some(
      (category) => category.name.toLowerCase() === categoryTitle.toLowerCase()
    ) ||
    categories.some(
      (category) => category.name.toLowerCase() === corporate.toLowerCase()
    );

  const bannerImage = data.banners.find(
    (banner) =>
      banner?.type === categoryTitle || banner?.type === "Corporate Gifts"
  );

  const images = bannerImage?.images;

  const CategoryData = data.groupData.find(
    (group) => group.type === categoryTitle || group.type === "Corporate Gifts"
  )?.categoryData;

  const headings = data.title.find(
    (title) => title.type === categoryTitle || title.type === "Corporate Gifts"
  )?.titles;

  useEffect(() => {
    let filterProducts = products;
    const selectedCategory =
      categoryTitle === "corporate-gifts" ? "Corporate Gifts" : categoryTitle;

    if (selectedCategory) {
      const categoryIdToFilter = categories.find(
        (cat) => cat.name === selectedCategory
      )?.id;

      filterProducts = products.filter((product) =>
        product.categories
          .map((category) => category.categoryId)
          .includes(categoryIdToFilter)
      );

      if (searchTerm !== "") {
        filterProducts = filterProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilterProducts(filterProducts);
    } else {
      setFilterProducts([]);
    }
  }, [categoryTitle, searchTerm, products, categories]);

  return (
    <>
      {categoryExists ? (
        <div className=" px-14">
          {searchTerm.length === 0 && (
            <>
              <Banner images={images} />
              <CategoryCard categoryData={CategoryData} titles={headings} />
              <div>
                <h1 className="text-3xl font-bold">{headings?.headTitle}</h1>
                <h2 className=" text-lg font-semibold text-gray-500">
                  {headings?.subTitle}
                </h2>
              </div>
            </>
          )}
          {filterProducts.length === 0 ? (
            <div className=" flex flex-col justify-center items-center gap-3">
              <img
                src="no-product.png"
                alt="No product found"
                className=" w-[150px] h-[150px]"
              />
              <div className=" flex flex-col justify-center items-center">
                <h1 className=" text-3xl font-bold">No Products Found</h1>
                <span className=" text-gray-500 text-sm font-semibold">
                  Your search did not match any products.
                </span>
                <span className=" text-gray-500 text-sm font-semibold ">
                  Please try again
                </span>
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-4">
              {filterProducts?.map((product) => (
                <Cards product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
