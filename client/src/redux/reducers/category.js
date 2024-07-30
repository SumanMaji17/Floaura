import { reducerCases } from "../constants/categoryConstants";

const initialState = {
  categories: [],
  categoryError: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case reducerCases.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categoryError: action.payload,
      };
    case reducerCases.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        categoryError: null,
      };
    case reducerCases.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        categoryError: action.payload,
      };
    case reducerCases.DELETE_CATEGORY_SUCCESS:
      const updatedCategories = state.categories.filter(
        (category) => category.id !== action.payload
      );

      return {
        ...state,
        categories: updatedCategories,
        categoryError: null,
      };
    case reducerCases.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryError: action.payload,
      };
    case reducerCases.UPDATE_CATEGORY_SUCCESS:
      const editedCategories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return { ...category, name: action.payload.name };
        }
        return category;
      });
      return {
        ...state,
        categories: editedCategories,
      };
    case reducerCases.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryError: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
