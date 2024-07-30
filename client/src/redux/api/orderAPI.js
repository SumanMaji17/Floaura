import axios from "axios";
import { GET_ALL_ORDERS, VERIFY_MEMBER } from "../../utils/ApiRoutes";

export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(GET_ALL_ORDERS, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log("Error while fetching orders:" + error);
  }
};

export const verifyMemberAPI = async (phoneNumber) => {
  try {
    const response = await axios.post(
      VERIFY_MEMBER,
      { phone: phoneNumber },
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("Error while verifying member");
  }
};
