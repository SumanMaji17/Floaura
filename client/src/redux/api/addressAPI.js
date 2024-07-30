import axios from "axios";
import { ADD_ADDRESS, DELETE_ADDRESS, GET_ALL_ADDRESS } from "../../utils/ApiRoutes";


export const createAddress = async (address) => {
    try {
      console.log(address)
      const response = await axios.post(
        ADD_ADDRESS,
        { address} ,
        {
          withCredentials: true,
        }
      );
  
      const data = response.data;
  
      if (!data.status) {
        data.AddedAddress = null;
      }
  
      return data;
    } catch (err) {
      console.error("Error while creating address:", err);
      throw err; // Re-throw the error to be caught by the calling code
    }
  };

export const getAllAddress = async () => {
  try {
    const { data } = await axios.get(GET_ALL_ADDRESS, {
      withCredentials: true,
    });

    if (data.status) {
      return data.addresses;
    } else return null;
  } catch (err) {
    console.log("Error while fetching address.");
  }
}

export const deleteAddress = async (selectedAddressId) => {
  try {
    const { data } = await axios.post(
      DELETE_ADDRESS,
      { selectedAddressId },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    console.log("Error while deleting category: " + err);
  }
};