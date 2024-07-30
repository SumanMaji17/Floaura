import CryptoJS from "crypto-js";
import { reducerCases } from "../constants/cartConstants";
import store from "../store";

const SECRET_KEY = process.env.REACT_APP_CRYPTO_SECRET_KEY;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const addToCartAction =
  ({ product }) =>
  async (dispatch) => {
    dispatch({ type: reducerCases.ADD_TO_CART, payload: product });
    const { cart } = store.getState();

    const encryptedCart = encryptData(cart);
    localStorage.setItem("cart", encryptedCart);
  };

export const initializeCartFromStorage = () => async (dispatch) => {
  const encryptedCart = localStorage.getItem("cart");

  if (encryptedCart) {
    const decryptedCart = decryptData(encryptedCart);
    console.log(decryptedCart);
    dispatch({ type: reducerCases.INITIALIZE_CART, payload: decryptedCart });
  }
};

export const isProductInCart = (productId) => {
  const encryptedCart = localStorage.getItem("cart");

  if (encryptedCart) {
    const decryptedCart = decryptData(encryptedCart);
    const foundItem = decryptedCart.items.find((item) => item.id === productId);
    return !!foundItem;
  }

  return false;
};

export const incrementQuantity =
  ({ id, price }) =>
  async (dispatch) => {
    try {
      if (id && price) {
        dispatch({
          type: reducerCases.INCREMENT_QUANTITY,
          payload: { id, price },
        });

        const { cart } = store.getState();

        const encryptedCart = encryptData(cart);
        localStorage.setItem("cart", encryptedCart);
      }
    } catch (error) {
      console.log("Error while adding quantity.");
    }
  };

export const decrementQuantity =
  ({ id, price }) =>
  async (dispatch) => {
    try {
      if (id && price) {
        dispatch({
          type: reducerCases.DECREMENT_QUANTITY,
          payload: { id, price },
        });

        const { cart } = store.getState();

        const encryptedCart = encryptData(cart);
        localStorage.setItem("cart", encryptedCart);
      }
    } catch (error) {
      console.log("Error while removing quantity.");
    }
  };

export const removeProductCart =
  ({ id, price, quantity }) =>
  async (dispatch) => {
    try {
      if (id && price && quantity) {
        dispatch({
          type: reducerCases.REMOVE_FROM_CART,
          payload: { id, price, quantity },
        });
        const { cart } = store.getState();

        const encryptedCart = encryptData(cart);
        localStorage.setItem("cart", encryptedCart);
      }
    } catch (error) {
      console.log("Error while removing product");
    }
  };

export const clearCartAction = () => async (dispatch) => {
  try {
    dispatch({ type: reducerCases.CLEAR_CART });
    const { cart } = store.getState();

    const encryptedCart = encryptData(cart);
    localStorage.setItem("cart", encryptedCart);
  } catch (error) {
    console.log("Error while removing cart");
  }
};
