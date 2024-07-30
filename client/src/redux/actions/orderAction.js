import { toast } from "react-toastify";
import * as api from "../api/orderAPI.js";
import { reducerCases } from "../constants/orderConstants.js";


const getAllOrdersSuccess = (orders) => ({
    type: reducerCases.FETCH_ORDERS_SUCCESS,
    payload: orders,
  });
  
  const getAllOrdersFailure = (error) => ({
    type: reducerCases.ORDER_ERROR,
    payload: error,
  });

export const fetchAllOrders = () => async (dispatch) => {
    try {
      const data = await api.getAllOrders();
      if (data.status) {
        dispatch(getAllOrdersSuccess(data.orders));
      } else {
        dispatch(getAllOrdersFailure("Error while fetching data."));
      }
    } catch (err) {
      console.log("Error while fetching all orders: " + err);
    }
  };


export  const verifyMember = async (phoneNumber) => {
    try {
      const response = await api.verifyMemberAPI(phoneNumber);
      return response.data.exists;
    } catch (error) {
      toast.error("Error verifying member.");
      console.error("Error verifying member:", error);
      return false;
    }
  };