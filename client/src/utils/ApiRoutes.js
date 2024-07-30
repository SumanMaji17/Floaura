export const HOST = "http://localhost:3005";

//--------------------Admin Routes-------------------------------
export const ADMIN_ROUTES = `${HOST}/api/admin`;
export const ADMIN_LOGIN = `${ADMIN_ROUTES}/admin-login`;
export const ADMIN_SIGNUP = `${ADMIN_ROUTES}/admin-signup`;
export const ADMIN_PROFILE = `${ADMIN_ROUTES}/admin-profile`;

//--------------------Category Routes---------------------------
export const CATEGORY_ROUTES = `${HOST}/api/category`;
export const ADD_CATEGORY = `${CATEGORY_ROUTES}/add-category`;
export const UPDATE_CATEGORY = `${CATEGORY_ROUTES}/update-category`;
export const GET_ALL_CATEGORY = `${CATEGORY_ROUTES}/get-all-category`;
export const DELETE_CATEGORY = `${CATEGORY_ROUTES}/delete-category`

//--------------------Product Routes----------------------------
export const PRODUCT_ROUTES = `${HOST}/api/product`
export const ADD_PRODUCT = `${PRODUCT_ROUTES}/add-product`;
export const UPDATE_PRODUCT = `${PRODUCT_ROUTES}/update-product`;
export const GET_ALL_PRODUCT = `${PRODUCT_ROUTES}/get-all-product`;
export const DELETE_PRODUCT = `${PRODUCT_ROUTES}/delete-product`


//--------------------User Routes--------------------------------
export const USER_ROUTES = `${HOST}/api/user`;
export const USER_LOGIN = `${USER_ROUTES}/user-login`;
export const USER_PASS_VERIFY = `${USER_ROUTES}/user-pass-verify`
export const USER_SIGNUP = `${USER_ROUTES}/user-signup`;
export const USER_PROFILE = `${USER_ROUTES}/user-profile`;
export const OTP_GENERATE = `${USER_ROUTES}/otp-generate`;
export const OTP_VERIFY = `${USER_ROUTES}/otp-verify`;
export const CREATE_REVIEW = `${USER_ROUTES}/create-review`
export const GET_ALL_REVIEW = `${USER_ROUTES}/get-all-reviews`
export const DELETE_REVIEW = `${USER_ROUTES}/delete-review`
export const EDIT_REVIEW = `${USER_ROUTES}/edit-review`
export const SENT_EMAIL = `${USER_ROUTES}/sent-email`
export const EDIT_PROFILE = `${USER_ROUTES}/edit-profile`
export const LOG_OUT= `${USER_ROUTES}/log-out`

//------------------------Address Routes--------------------------
export const ADDRESS_ROUTES = `${HOST}/api/address`;
export const ADD_ADDRESS = `${ADDRESS_ROUTES}/add-address`;
export const GET_ALL_ADDRESS = `${ADDRESS_ROUTES}/get-all-address`;
export const UPDATE_ADDRESS = `${ADDRESS_ROUTES}/update-address`;
export const DELETE_ADDRESS = `${ADDRESS_ROUTES}/delete-address`;


//------------------------Order Routes-----------------------------

//-----------------------Payment-----------------------------------
export const ORDER_ROUTES = `${HOST}/api/order`;
export const CREATE_ORDER = `${ORDER_ROUTES}/self-pay`;
export const GET_ALL_ORDERS =`${ORDER_ROUTES}/get-all-orders`
export const VERIFY_MEMBER = `${ORDER_ROUTES}/verifyMember`