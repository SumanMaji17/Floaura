import { toast } from "react-toastify";
import * as api from "../api/addressAPI.js";
import { reducerCases } from "../constants/addressConstants.js";

const addAddressSuccess = (address) => ({
  type: reducerCases.ADD_ADDRESS_SUCCESS,
  payload: address,
});

const addressError = (error) => ({
  type: reducerCases.ADDRESS_ERROR,
  payload: error,
});

const getAllAddressSuccess = (addresses) => ({
  type: reducerCases.FETCH_ADDRESS_SUCCESS,
  payload: addresses,
})

const deleteAddressSuccess = (selectedAddressId) => ({
  type: reducerCases.DELETE_ADDRESS_SUCCESS,
  payload: selectedAddressId,
})

export const fetchAllAddress = () => async (dispatch) => {
  try {
    const addresses = await api.getAllAddress();
    if (addresses) {
      dispatch(getAllAddressSuccess(addresses));
    } else {
      dispatch(addressError("Error while fetching data."));
    }
  } catch (err) {
    console.log("Error while fetching all addresses: " + err);
  }
};

export const createAddress =
  ( address ) =>
  async (dispatch) => {
    try {
      console.log(address);
      const data = await api.createAddress(address);
      if (data.status) {
        dispatch(addAddressSuccess(data.AddedAddress));
      } else {
        dispatch(addressError(data.msg));
      }
    } catch (err) {
      console.log("Error while adding address: " + err);
    }
  };


  export const deleteAddressAction =
  (selectedAddressId) => async (dispatch) => {
    try {
      const deletedAddress = await api.deleteAddress(selectedAddressId);

      if (deletedAddress.status) {
        toast.success(deletedAddress.msg);
        dispatch(deleteAddressSuccess(selectedAddressId));
      } else {
        toast.error(deletedAddress.msg);
        dispatch(addressError(deletedAddress.msg));
      }
    } catch (err) {
      console.log("Error while deleting address: " + err);
    }
  };
