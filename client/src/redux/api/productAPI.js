import axios from "axios";
import { ADD_PRODUCT, GET_ALL_PRODUCT } from "../../utils/ApiRoutes";

export const createProduct = async ({
  productName,
  imageURLs,
  description,
  price,
  discountedPrice,
  stock,
  category,
}) => {
  try {
    console.log(category);
    const { data } = await axios.post(
      ADD_PRODUCT,
      {
        productName,
        imageURLs,
        description,
        price,
        discountedPrice,
        stock,
        categorys: category,
      },
      {
        withCredentials: true,
      }
    );

    if (data.status) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error while adding product:" + error);
  }
};

export const getAllProduct = async () => {
  try {
    const { data } = await axios.get(GET_ALL_PRODUCT);
    return data;
  } catch (error) {
    console.log("Error while fetching products:" + error);
  }
};
