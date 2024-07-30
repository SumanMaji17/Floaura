import React, { useEffect, useState } from "react";
import Dropdown from "../../../common/DropDown/DropDown.jsx";
import { getAllCategory } from "../../../redux/api/categoryAPI.js";
import { storage } from "../../../Firebase/Firebase.js";
import ProductDetails from "../../../common/Product/ProductDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProductAction } from "../../../redux/actions/productAction.js";

export default function AddProduct() {
  const dispatch = useDispatch();
  const productError = useSelector((state) => state.product.productError);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [price, setPrice] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [productName, setProductName] = useState("Product_Name");
  const [description, setDescription] = useState("Product_Description");
  const [stock, setStock] = useState(null);
  const navigate = useNavigate();
  const handleAddProduct = async (event) => {
    event.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedDiscountedPrice = parseFloat(discountedPrice);
    const parsedStock = parseInt(stock, 10);

    setPrice(parsedPrice);
    setDiscountedPrice(parsedDiscountedPrice);
    setStock(parsedStock);
    console.log(category);

    if (
      productName &&
      imageURLs &&
      description &&
      !isNaN(parsedPrice) &&
      !isNaN(parsedDiscountedPrice) &&
      !isNaN(parsedStock) &&
      category
    ) {
  
      dispatch(
        createProductAction({
          productName,
          imageURLs,
          description,
          price: parsedPrice,
          discountedPrice: parsedDiscountedPrice,
          stock: parsedStock,
          category,
        })
      ).then(() => {
        if (productError === null) {
          navigate("/admin/products/all-products");
        }
      });
    } else {
      console.log("All fields are required.");
    }
  };

  const URLS = [];

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const imageList = [];
    for (let i = 0; i < fileList.length; i++) {
      imageList.push(fileList[i]);
    }
    setImages(imageList);
  };

  const uploadImage = async (image) => {
    try {
      let imageName = `${Date.now()}${image.name}`;
      const uploadTask = storage.ref(`images/${imageName}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.error("Error during upload:", error);
          throw error;
        },
        async () => {
          try {
            const downloadURL = await storage
              .ref("images")
              .child(imageName)
              .getDownloadURL();
            console.log(
              "Image uploaded successfully. Download URL:",
              downloadURL
            );
            URLS.push(downloadURL);
          } catch (downloadError) {
            console.error("Error getting download URL:", downloadError);
            throw downloadError;
          }
        }
      );
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw uploadError;
    }
  };

  const handleUpload = async () => {
    try {
      images.map((image) => uploadImage(image));
      setImageURLs(URLS);
    } catch (error) {
      console.error("Error during image uploads:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await getAllCategory();

        setCategories(category);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (selectedCategorys) => {
    setCategory(selectedCategorys);
  };

  return (
    <div className="">
      <div className=" m-10">
        <div className=" p-5 border-gray-300 shadow-[0_0_8px_0] shadow-slate-400 rounded-xl bg-white">
          <div className="justify-between text-4xl">Add Product</div>
          <div className=" border-t-2 border-gray-300 my-4 w-[40%]"></div>
          <div>
            <div className=" grid grid-cols-2 gap-3">
              <div className=" flex flex-col">
                <span className=" text-lg py-2 font-normal">Product Name</span>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  type="text"
                  placeholder="Enter a product name"
                  className=" border p-2 rounded-lg outline-gray-300"
                />
              </div>
              <div className=" flex flex-col">
                <span className=" text-lg py-2 font-normal">
                  Product Description
                </span>
                <div className=" flex justify-between ">
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Enter product Description"
                    className=" border p-2 rounded-lg outline-gray-300 w-full mr-3"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className=" text-lg py-2 font-normal">Sale Price</span>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder="Enter sale price"
                  className=" border p-2 rounded-lg outline-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <span className=" text-lg py-2 font-normal">
                  Discounted Price
                </span>
                <input
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  type="text"
                  placeholder="Enter discounted price"
                  className=" border p-2 rounded-lg outline-gray-300"
                />
              </div>
            </div>
            <div className=" grid grid-cols-3 ">
              <div className="flex flex-col">
                <span className=" text-lg py-2 font-normal">
                  Select a category
                </span>
                <Dropdown options={categories} onSelect={handleSelect} />
              </div>
              <div className=" flex flex-col mr-20">
                <span className=" text-lg py-2 font-normal">Stocks</span>
                <input
                  type="text"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter number of stock"
                  className=" border p-2 rounded-lg outline-gray-300"
                />
              </div>
              <div className=" flex flex-col">
                <span className=" text-lg py-2 font-normal">Upload Images</span>
                <div className=" flex justify-between gap-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className=" px-2 py-[6px] rounded border border-solid border-neutral-300 bg-clip-padding  text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  />
                  <button
                    className=" border-4 border-[#ff9900] text-[#ff9900] font-semibold  px-4 rounded-lg hover:bg-[#ff9900] hover:text-white active:bg-[#ffae00] active:text-white"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-6">
            <button
              className=" p-3 border rounded-lg bg-[#ff9900] hover:bg-[#ffae00] font-semibold text-white  active:bg-[#ff9900] "
              onClick={handleAddProduct}
            >
              Upload Product
            </button>
          </div>
        </div>
      </div>
      <div className="m-10 bg-white border-gray-300 shadow-[0_0_8px_0] shadow-slate-400 rounded-xl">
        <div className=" p-5">
          <div className=" mb-10">
            <h2 className="text-3xl py-2 font-medium">Preview</h2>
            <div className=" border-t-2 border-gray-300 my-2 w-[40%]"></div>
          </div>
          <ProductDetails
            product={{
              name: productName,
              images: imageURLs,
              description: description,
              price: parseFloat(price),
              discountedPrice: parseFloat(discountedPrice),
              stock: parseInt(stock)
            }}
          />
        </div>
      </div>
    </div>
  );
}
