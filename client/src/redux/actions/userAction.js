import { reducerCases } from "../constants/userConstants";
import {
  createReviewAPI,
  deleteReview,
  editProfile,
  editReview,
  generateOtpAPI,
  getAllReviews,
  getUserDataAPI,
  loginUserAPI,
  logoutApi,
  registerUserAPI,
  sentEmail,
  userPassVerifyAPI,
  verifyOtpAPI,
} from "../api/userAPI";
import { toast } from "react-toastify";

export const fetchUserData = () => async (dispatch) => {
  try {
    const data = await getUserDataAPI();

    if (!data.status) {
      dispatch({
        type: reducerCases.SET_USER_PANEL_ERROR,
        payload: "Unauthorized",
      });
    }

    if (data?.data) {
      const { id, name, email, phone } = data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        payload: {
          id,
          name,
          email,
          phone,
        },
      });
    }

    dispatch({
      type: reducerCases.USER_LOGIN_SUCCESS,
      payload: "Authorized",
    });
  } catch (err) {
    console.log(err);
  }
};

export const userPasswordVerificationAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await userPassVerifyAPI({ email, password });
      console.log(user);

      if (!user.status) {
        dispatch({
          type: reducerCases.USER_LOGIN_ERROR,
          payload: "Unauthorized",
        });
      }

      if (user?.data) {
        const { email, phone } = user.data;
        dispatch({
          type: reducerCases.USER_PASSWORD_VERIFY_SUCCESS,
          payload: {
            email,
            phone,
          },
        });
      }
    } catch (error) {
      console.log("Error while posting data while Loging..." + error);
    }
  };

export const loginUserAction = (email) => async (dispatch) => {
  try {
    console.log(email);
    const user = await loginUserAPI(email);
    if (!user.status) {
      dispatch({
        type: reducerCases.USER_LOGIN_ERROR,
        payload: "Unauthorized",
      });
    }

    if (user?.data) {
      const { id, email, name, phone } = user.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        payload: {
          id,
          name,
          email,
          phone,
        },
      });
      dispatch({
        type: reducerCases.USER_LOGIN_SUCCESS,
        payload: "Authorized",
      });
    }
  } catch (error) {
    console.log("Error while loging....");
  }
};

const registerUserSuccess = (user) => ({
  type: reducerCases.USER_REGISTER_SUCCESS,
  payload: user,
});

const registerUserFailure = (msg) => ({
  type: reducerCases.USER_REGISTER_FAILURE,
  payload: msg,
});

export const registerUserAction =
  ({ email, name, password, phone }) =>
  async (dispatch) => {
    try {
      const data = await registerUserAPI({ email, name, password, phone });
      if (data) {
        if (data.status) {
          dispatch(registerUserSuccess("Authorized"));
          dispatch({
            type: reducerCases.USER_LOGIN_SUCCESS,
            payload: "Authorized",
          });
        } else {
          dispatch(registerUserFailure(data.msg));
        }
      } else {
        dispatch(
          registerUserFailure(
            "Error while retreving data while registration..."
          )
        );
      }
    } catch (err) {
      console.log("Error while registration....");
    }
  };

export const generateOtpAction = async ({ email, phone }) => {
  try {
    const data = await generateOtpAPI({ email, phone });
    if (data.status) {
      return data.status;
    } else {
      console.log("Error while registration...");
    }
  } catch (err) {
    console.log("Error while registration:" + err);
  }
};

export const verifyOtpAction = async (data) => {
  try {
    const response = await verifyOtpAPI(data);
    return response.status;
  } catch (error) {
    throw error; // Throw error if request fails
  }
};

const createReviewSuccess = (newReview) => ({
  type: reducerCases.CREATE_REVIEW_SUCCESS,
  payload: newReview,
});

const createReviewFailure = (error) => ({
  type: reducerCases.REVIEW_FAILURE,
  payload: error,
});

const getAllReviewsSuccess = (reviews) => ({
  type: reducerCases.GET_ALL_REVIEWS,
  payload: reviews,
});

const getAllReviewsFailure = (error) => ({
  type: reducerCases.REVIEW_FAILURE,
  payload: error,
});

const deleteReviewSuccess = (deletedReview) => ({
  type: reducerCases.DELETE_REVIEW,
  payload: deletedReview.id,
});

const editReviewSuccess = (editedReview) => ({
  type: reducerCases.EDIT_REVIEW,
  payload: {
    id: editedReview.id,
    rating: editedReview.rating,
    review: editedReview.review,
  },
});

export const searchTermAction = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: reducerCases.SET_SEARCH_TERM, payload: searchTerm });
  } catch (error) {
    console.log(error);
  }
};

export const filteredProductsAction = (filteredProducts) => ({
  type: reducerCases.SET_FILTERED_PRODUCTS,
  payload: filteredProducts,
});

export const createReview =
  ({ reviewData, orderId }) =>
  async (dispatch) => {
    try {
      const data = await createReviewAPI({ reviewData, orderId });
      if (data.status) {
        toast.success(data.msg);
        dispatch(createReviewSuccess(data.createdReviews[0]));
      } else {
        toast.error(data.msg);
        dispatch(createReviewFailure(data.msg));
      }
    } catch (err) {
      console.log("Error while creating reviews: " + err);
    }
  };

export const fetchAllReviews = () => async (dispatch) => {
  try {
    const data = await getAllReviews();
    if (data.status) {
      dispatch(getAllReviewsSuccess(data.reviews));
    } else {
      dispatch(getAllReviewsFailure("Error while fetching data."));
    }
  } catch (err) {
    console.log("Error while fetching all reviews: " + err);
  }
};

export const deleteReviewAction = (id) => async (dispatch) => {
  try {
    const data = await deleteReview(id);
    if (data.status) {
      dispatch(deleteReviewSuccess(data.deletedReview));
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  } catch (error) {
    console.log("Errow while deleting review...");
  }
};

export const editReviewAction =
  ({ reviewId, rating, review }) =>
  async (dispatch) => {
    try {
      const data = await editReview({ reviewId, rating, review });
      if (data.status) {
        dispatch(editReviewSuccess(data.editedReview));
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log("Error while editing review...");
    }
  };

export const contactUsAction =
  ({ name, email, message }) =>
  async (dispatch) => {
    try {
      const data = await sentEmail({ name, email, message });
      if (data.status) {
        toast.success("Email sent successfully 🚀");
      } else {
        toast.error("Server error. Please try again later...");
      }
    } catch (error) {
      console.log("Error while sending email...");
    }
  };

export const EditProfileAction = (newName) => async (dispatch) => {
  try {
    const data = await editProfile(newName);
    if (data.status) {
      toast.success("Name has been save successfully...🚀");
    } else {
      toast.error("Server error. Please try again later...");
    }
  } catch (error) {
    console.log("Error while saving name...");
  }
};

export const logout = () => async (dispatch) => {
  try {
    const data = await logoutApi();
    if(data.status){
      dispatch({ type: reducerCases.LOG_OUT });
      toast.success("Log out successfully.")
    }
    else{
      toast.error("Error while logging out!!");
    }
  } catch (error) {
    toast.error("Error while logging out!!");
    console.log("Error while logging out!!");
  }
};
