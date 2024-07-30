import axios from "axios";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORY,
  UPDATE_CATEGORY,
} from "../../utils/ApiRoutes";

export const createCategory = async (category) => {
  try {
    const response = await axios.post(
      ADD_CATEGORY,
      { category },
      {
        withCredentials: true,
      }
    );

    const data = response.data;

    if (!data.status) {
      data.AddedCategory = null;
    }

    return data;
  } catch (err) {
    console.error("Error while creating category:", err);
    throw err; // Re-throw the error to be caught by the calling code
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(GET_ALL_CATEGORY, {
      withCredentials: true,
    });

    if (data.status) {
      return data.categories;
    } else return null;
  } catch (err) {
    console.log("Error while fetching category.");
  }
};

export const deleteCategory = async (selectedCategoryId) => {
  try {
    const { data } = await axios.post(
      DELETE_CATEGORY,
      { selectedCategoryId },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    console.log("Error while deleting category: " + err);
  }
};

export const updateCategory = async ({ categoryName, categoryId }) => {
  try {
    const { data } = await axios.post(
      UPDATE_CATEGORY,
      { categoryName, categoryId },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log("Error while updating category: " + err);
  }
};
