import { toast } from "react-toastify";
import * as api from "../api/productAPI.js";
import { reducerCases } from "../constants/productConstants.js";

const addProductSuccess = (newProduct) => ({
  type: reducerCases.ADD_PRODUCT_SUCCESS,
  payload: newProduct,
});

const addProductFailure = (error) => ({
  type: reducerCases.ADD_PRODUCT_FAILURE,
  payload: error,
});

const getAllProductSuccess = (products) => ({
  type: reducerCases.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const getAllProductsFailure = (error) => ({
  type: reducerCases.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

const deleteProductSuccess = (productId) => ({
  type: reducerCases.DELETE_PRODUCT_SUCCESS,
  payload: productId,
});

const deleteProductFailure = (error) => ({
  type: reducerCases.DELETE_PRODUCT_FAILURE,
  payload: error,
});

const updatedProductSuccess = ({ name, id }) => ({
  type: reducerCases.UPDATE_PRODUCT_SUCCESS,
  payload: { id, name },
});

const updatedProductFailure = ({ msg }) => ({
  type: reducerCases.UPDATE_PRODUCT_FAILURE,
  payload: msg,
});

export const createProductAction =
  ({
    productName,
    imageURLs,
    description,
    price,
    discountedPrice,
    stock,
    category,
  }) =>
  async (dispatch) => {
    try {
      const data = await api.createProduct({
        productName,
        imageURLs,
        description,
        price,
        discountedPrice,
        stock,
        category,
      });
      if (data.status) {
        toast.success(data.msg);
        dispatch(addProductSuccess(data.AddedProduct));
      } else {
        dispatch(addProductFailure(data.msg));
      }
    } catch (err) {
      console.log("Error while adding product: " + err);
    }
  };

export const fetchAllProduct = () => async (dispatch) => {
  try {
    const data = await api.getAllProduct();
    if (data.status) {
      dispatch(getAllProductSuccess(data.products));
    } else {
      dispatch(getAllProductsFailure("Error while fetching data."));
    }
  } catch (err) {
    console.log("Error while fetching all products: " + err);
  }
};

// export const deleteProductAction =
//   (selectedProductId) => async (dispatch) => {
//     try {
//       const deletedProduct = await api.deleteProduct(selectedProductId);

//       if (deletedProduct.status) {
//         toast.success(deletedProduct.msg);
//         dispatch(deleteProductSuccess(selectedProductId));
//       } else {
//         toast.error(deletedProduct.msg);
//         dispatch(deleteProductFailure(deletedProduct.msg));
//       }
//     } catch (err) {
//       console.log("Error while deleting product: " + err);
//     }
//   };

// export const updateProductAction =
//   ({ productName, productId }) =>
//   async (dispatch) => {
//     try {
//       const updatedProduct = await api.updateProduct({
//         productName,
//         productId,
//       });

//       if (updatedProduct.status) {
//         toast.success(updatedProduct.msg);
//         dispatch(
//           updatedProductSuccess({
//             name: updatedProduct.productUpdated.name,
//             id: productId,
//           })
//         );
//       } else {
//         dispatch(updatedProductFailure({ msg: updatedProduct.msg }));
//       }
//     } catch (err) {
//       console.log("Error while updating product: ", err);
//     }
//   };
