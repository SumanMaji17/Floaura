import { toast } from "react-toastify";
import * as api from "../api/categoryAPI.js";
import { reducerCases } from "../constants/categoryConstants.js";

const addCategorySuccess = (newCategory) => ({
  type: reducerCases.ADD_CATEGORY_SUCCESS,
  payload: newCategory,
});

const addCategoryFailure = (error) => ({
  type: reducerCases.ADD_CATEGORY_FAILURE,
  payload: error,
});

const getAllCategorySuccess = (categories) => ({
  type: reducerCases.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

const getAllCategoryFailure = (error) => ({
  type: reducerCases.FETCH_CATEGORIES_FAILURE,
  payload: error,
});

const deleteCategorySuccess = (categoryId) => ({
  type: reducerCases.DELETE_CATEGORY_SUCCESS,
  payload: categoryId,
});

const deleteCategoryFailure = (error) => ({
  type: reducerCases.DELETE_CATEGORY_FAILURE,
  payload: error,
});

const updatedCategorySuccess = ({ name, id }) => ({
  type: reducerCases.UPDATE_CATEGORY_SUCCESS,
  payload: { id, name },
});

const updatedCategoryFailure = ({ msg }) => ({
  type: reducerCases.FETCH_CATEGORIES_FAILURE,
  payload: msg,
});

export const createCategoryAction =
  (category) => async (dispatch) => {
    try {
      const data = await api.createCategory(category);
      if (data.status) {
        toast.success(data.msg);
        dispatch(addCategorySuccess(data.AddedCategory));
      } else {
        dispatch(addCategoryFailure(data.msg));
      }
    } catch (err) {
      console.log("Error while adding category: " + err);
    }
  };

export const fetchAllCategory = () => async (dispatch) => {
  try {
    const categories = await api.getAllCategory();
    if (categories) {
      dispatch(getAllCategorySuccess(categories));
    } else {
      dispatch(getAllCategoryFailure("Error while fetching data."));
    }
  } catch (err) {
    console.log("Error while fetching all categories: " + err);
  }
};

export const deleteCategoryAction =
  (selectedCategoryId) => async (dispatch) => {
    try {
      const deletedCategory = await api.deleteCategory(selectedCategoryId);

      if (deletedCategory.status) {
        toast.success(deletedCategory.msg);
        dispatch(deleteCategorySuccess(selectedCategoryId));
      } else {
        toast.error(deletedCategory.msg);
        dispatch(deleteCategoryFailure(deletedCategory.msg));
      }
    } catch (err) {
      console.log("Error while deleting category: " + err);
    }
  };

export const updateCategoryAction =
  ({ categoryName, categoryId }) =>
  async (dispatch) => {
    try {
      const updatedCategory = await api.updateCategory({
        categoryName,
        categoryId,
      });
      
      if (updatedCategory.status) {
        toast.success(updatedCategory.msg);
        dispatch(
          updatedCategorySuccess({
            name: updatedCategory.categoryUpdated.name,
            id: categoryId,
          })
        );
      } else {
        dispatch(updatedCategoryFailure({ msg: updatedCategory.msg }));
      }
    } catch (err) {
      console.log("Error while updating category: ", err);
    }
  };
