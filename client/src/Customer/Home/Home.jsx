import React, { useEffect, useState } from "react";
import GiftCard from "../components/giftCard/GiftCard";
import Review from "../components/Review/Review";
import CategoryCard from "../components/categoryCard/CategoryCard";
import Advantage from "../components/advantage/Advantage";
import ProductGallery from "../components/products/ProductGallery";
import Banner from "../components/Banner/Banner";
import data from "../data/data.json";
import categorysData from "../data/data.json";
import ProductCards from "../components/products/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { filteredProductsAction } from "../../redux/actions/userAction";
import Cards from "../../common/Product/Cards";

export default function Home() {
  const { products } = useSelector((state) => state.product);
  const { searchTerm } = useSelector((state) => state.user);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const homeCategoryData = categorysData.groupData.find(
    (group) => group.type === "Home"
  ).categoryData;

  const bannerImage = data.banners.find((banner) => banner?.type === "Home");

  const images = bannerImage?.images;

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts([]);
    } else {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredProducts(results);
    }
  }, [searchTerm, products]);

 

  return (
    <div className=" mx-10">
      {filteredProducts.length === 0 ? (
        <>
          <Banner images={images} />
          <CategoryCard categoryData={homeCategoryData} />
          <div className="  h-[2px] bg-slate-300  flex justify-center items-center"></div>
          <GiftCard />
          <ProductGallery />
        </>
      ) : (
        <>
          <div className=" grid grid-cols-4">
            {filteredProducts.map((product) => (
              <Cards product={product} key={product.id} />
            ))}
          </div>
        </>
      )}

      <Advantage />
      <img src="banner.png" alt="banner" className=" my-10" />
      <ProductCards />
      <Review />
    </div>
  );
}
