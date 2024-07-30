import { reducerCases } from "../constants/userConstants";

const initialState = {
  email: null,
  userInfo: null,
  userPanelError: null,
  userPassSuccess: null,
  userPassFailure: null,
  loginSuccess: null,
  loginError: null,
  registerSucces: null,
  registerError: null,
  reviews: [],
  searchTerm: "",
  filteredProducts: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload ? action.payload : null,
      };
    case reducerCases.SET_USER_PANEL_ERROR:
      return {
        ...state,
        userPanelError: action.payload ? action.payload : null,
      };
    case reducerCases.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload ? action.payload : null,
        loginError: null,
      };
    case reducerCases.USER_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload ? action.payload : null,
      };
    case reducerCases.SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case reducerCases.USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerSucces: action.payload ? action.payload : null,
        userPanelError: null,
        loginError: null,
      };
    case reducerCases.USER_REGISTER_FAILURE:
      return {
        ...state,
        registerError: action.payload ? action.payload : null,
      };
    case reducerCases.USER_PASSWORD_VERIFY_SUCCESS:
      return {
        ...state,
        userPassSuccess: action.payload,
      };
    case reducerCases.USER_PASSWORD_VERIFY_FAILURE:
      return {
        ...state,
        userPassFailure: action.payload ? action.payload : null,
      };
    case reducerCases.GET_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload ? action.payload : [],
      };
    case reducerCases.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case reducerCases.REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case reducerCases.DELETE_REVIEW:
      const updatedReview = state.reviews.filter(
        (review) => review.id !== action.payload
      );
      return {
        ...state,
        reviews: updatedReview,
        error: null,
      };

    case reducerCases.EDIT_REVIEW:
      const editedReviews = state.reviews.map((rev) => {
        if (rev.id === action.payload.id) {
          return {
            ...rev,
            rating: action.payload.rating,
            review: action.payload.review,
          };
        }
        return rev;
      });

      return {
        ...state,
        reviews: editedReviews,
      };

    case reducerCases.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case reducerCases.SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case reducerCases.LOG_OUT:
      return {
        ...state,
        email: null,
        userInfo: null,
        userPanelError: null,
        userPassSuccess: null,
        userPassFailure: null,
        loginSuccess: null,
        loginError: null,
        registerSucces: null,
        registerError: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
