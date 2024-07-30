import { combineReducers } from "redux";

import adminReducer from "./admin";
import categoryReducer from "./category";
import userReducer from "./user";
import productReducer from "./product";
import cartReducer from "./cart";
import addressReduce from "./address";
import orderReducer from "./order";

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReduce,
  order: orderReducer,
});

export default rootReducer;
