import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer,  // Set the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable check for non-serializable values in the state
    }).concat(thunk),  // Include Redux Thunk middleware
  // Add other middleware or enhancers if needed
  });


export default store;