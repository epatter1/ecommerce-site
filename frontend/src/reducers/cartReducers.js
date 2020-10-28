import {
  CART_ADD_ITEM,
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
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        {
          /* concatenates cartItems with the new item */
        }
        return { ...state, cartItems: [...state.cartItems, item] };
      }
      {
        /* Filters out products: 
        -- removes product with action.payload id */
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
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
    
      /* return previous statu plus empty array */
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
