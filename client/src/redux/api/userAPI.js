import axios from "axios";
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  EDIT_PROFILE,
  EDIT_REVIEW,
  GET_ALL_REVIEW,
  LOG_OUT,
  OTP_GENERATE,
  OTP_VERIFY,
  SENT_EMAIL,
  USER_LOGIN,
  USER_PASS_VERIFY,
  USER_PROFILE,
  USER_SIGNUP,
} from "../../utils/ApiRoutes";

export const getUserDataAPI = async () => {
  try {
    const { data } = await axios.get(USER_PROFILE, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    console.log("Error while fetching user data:" + err);
  }
};

export const loginUserAPI = async (email) => {
  try {
    console.log(email);
    const { data } = await axios.post(
      USER_LOGIN,
      { email },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log("Error while posting data in api while login:" + err);
  }
};

export const userPassVerifyAPI = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      USER_PASS_VERIFY,
      { email, password },
      {
        withCredentials: true,
      }
    );

    console.log(data);
    return data;
  } catch (err) {
    console.log("Error while posting data in api while login:" + err);
  }
};

export const registerUserAPI = async ({ email, name, password, phone }) => {
  try {
    const response = await axios.post(
      USER_SIGNUP,
      { email, name, password, phone },
      {
        withCredentials: true,
      }
    );

    if (response) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log("Error while posting data while registration");
  }
};

export const generateOtpAPI = async ({ email, phone }) => {
  try {
    const { data } = await axios.post(
      OTP_GENERATE,
      { email, phone },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    console.log("Error while registration:" + err);
  }
};

export const verifyOtpAPI = async (data) => {
  try {
    const response = await axios.post(OTP_VERIFY, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log("Error while verifying otp:" + err);
  }
};

export const createReviewAPI = async ({ reviewData, orderId }) => {
  try {
    const response = await axios.post(
      CREATE_REVIEW,
      { reviewData, orderId },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error while creating review:" + error);
  }
};

export const getAllReviews = async () => {
  try {
    const response = await axios.get(GET_ALL_REVIEW, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("Error while fetching reviews:" + error);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.post(
      DELETE_REVIEW,
      { reviewId },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error while deleting review...");
  }
};

export const editReview = async ({ reviewId, rating, review }) => {
  try {
    const response = await axios.post(
      EDIT_REVIEW,
      { reviewId, rating, review },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error while editing review...");
  }
};

export const sentEmail = async ({ name, email, message }) => {
  try {
    const response = await axios.post(SENT_EMAIL, { name, email, message });

    return response.data;
  } catch (error) {
    console.log("Error while sending email..");
  }
};

export const editProfile = async (newName) => {
  try {
    const response = await axios.post(
      EDIT_PROFILE,
      { newName },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error while sending email..");
  }
};

export const logoutApi = async () => {
  try {
    const response = await axios.get(LOG_OUT, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error while logging out!!");
  }
};
