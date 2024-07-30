import { ADMIN_PROFILE } from "../../utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "../constants/adminConstants";

export const fetchAdminData = () => async (dispatch) => {
  try {
    
    const { data: adminData } = await axios.get(ADMIN_PROFILE, {
      withCredentials: true,
    });

    if (!adminData.status) {
      dispatch({
        type: reducerCases.SET_ADMIN_PANEL_ERROR,
        payload: 'Unauthorized',
      });
    }

    if (adminData?.data) {
      const { id, name, email } = adminData.data;
      dispatch({
        type: reducerCases.SET_ADMIN_INFO,
        payload: {
          id,
          name,
          email,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};


