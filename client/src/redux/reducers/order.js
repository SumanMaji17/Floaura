import { reducerCases } from "../constants/orderConstants";

const initialState = {
  orders: [],
  orderError: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case reducerCases.ORDER_ERROR:
      return {
        ...state,
        orderError: action.payload,
      };
    case reducerCases.ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        orderError: null,
      };
    
    default:
      return state;
  }
};

export default orderReducer;
