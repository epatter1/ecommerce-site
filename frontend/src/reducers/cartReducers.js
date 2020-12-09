import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      {
        /* check if item is in the cart already
          if items exists, return that item
          otherwise return the new (selected) item */
      }
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        {
          /* only update cartItems */
        }
        return {
          ...state,
          error: '', //means addToCart was successful and error should be gone.
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        {
          /* concatenates cartItems with the new item */
        }
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }
      {
        /* Filters out products: 
        -- removes product with action.payload id */
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '', //setting error to empty string the reset the error in the CartScreen page. This action affects the CartScreen view.
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

      {
        /* Update shipping address
        -- action.payload contains data set in saveShippingAddress()
           in cartActions.js  */
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

      {
        /* Update payment method
        -- action.payload contains data set in savePaymentMethod()
           in cartActions.js  */
      }
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
      {
        /* Handle failure to add item to cart */
      }
    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };

    /* return previous statu plus empty array */
    case CART_EMPTY: //setting error to empty string the reset the error in the CartScreen page. This action affects the CartScreen view.
      return { ...state, error: '', cartItems: [] };
    default:
      return state;
  }
};
