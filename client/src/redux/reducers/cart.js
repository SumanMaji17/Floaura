import { reducerCases } from "../constants/cartConstants";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  cartError: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.INITIALIZE_CART:
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalPrice: action.payload.totalPrice,
      };
    case reducerCases.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case reducerCases.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        totalItems: state.totalItems - 1,
        totalPrice:
          state.totalPrice - action.payload.price * action.payload.quantity,
      };

    case reducerCases.INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalPrice: state.totalPrice + action.payload.price,
      };

    case reducerCases.DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        totalPrice: state.totalPrice - action.payload.price,
      };

    case reducerCases.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case reducerCases.CART_ERROR:
      return {
        ...state,
        cartError: action.payload ? action.payload : null,
      };

    default:
      return state;
  }
};

export default cartReducer;
