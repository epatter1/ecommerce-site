import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products");
    {
      /* -- When action is dispatched, it changes the state of redux
             Based on this, you can update the HomeScreen to show products
          -- Need to set type.
          -- Payload is the data from backend.
    */
    }
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
      dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
  }
};

{/* Get product by ID from backend and update redux store based on it. 
  -- If error.reponse exists, this means the backend error failed,
  so I need to display THAT error instead of a general error 
  Otherwise, display the normal error (error.message) */ }
export const detailsProduct = (productId) => async(dispatch) => {
  dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
    type: PRODUCT_DETAILS_FAIL,
    payload:
      error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message,
  });
  }
};