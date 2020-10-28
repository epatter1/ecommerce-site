import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

{
  /* saves order in DB and return async function that
accepts dispatch and getState */
}
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
      {/* getState returns whole redux store.
          from store, you get userSignIn
          from userSignIn, you get userInfo
        
          userInfo.token contains token in the
                  signin process of user
        */}
      const { userSignIn: { userInfo } }  = getState();
      const { data } = await Axios.post('/api/orders', order, {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          },
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      /* cleaning localStorage */
      localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
