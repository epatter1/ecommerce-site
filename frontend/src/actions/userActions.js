import Axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.post('/api/users/register', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    {/* adding USER_SIGNIN_SUCCESS because in App.js, you read
        userSignIn to authenticate the user  */}
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    {
      /* store user data to keep them signed in */
    }
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.post(`/api/users/signin`, { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    {
      /* store user data to keep them signed in */
    }
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};
