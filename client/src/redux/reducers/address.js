import { reducerCases } from "../constants/addressConstants";

const initialState = {
  addresses: [],
  addressError: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
      };
    case reducerCases.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        addressError: null,
      };

    case reducerCases.DELETE_ADDRESS_SUCCESS:
      const updatedAddress = state.addresses.filter(
        (address) => address.id !== action.payload
      );

      return {
        ...state,
        addresses: updatedAddress,
        addressError: null,
      };
    
    case reducerCases.UPDATE_ADDRESS_SUCCESS:
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

export default addressReducer;
