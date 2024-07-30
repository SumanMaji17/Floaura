import { reducerCases } from "../constants/productConstants";

const initialState = {
  products: [],
  productError: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case reducerCases.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        productError: action.payload,
      };
    case reducerCases.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        productError: null,
      };
    case reducerCases.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        productError: action.payload,
      };
    case reducerCases.DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );

      return {
        ...state,
        products: updatedProducts,
        productError: null,
      };
    case reducerCases.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        productError: action.payload,
      };
    case reducerCases.UPDATE_PRODUCT_SUCCESS:
      const editedProduct = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, name: action.payload.name };
        }
        return product;
      });
      return {
        ...state,
        products: editedProduct,
      };
    case reducerCases.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        productError: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
