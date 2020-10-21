import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
    {/* Filters out products: 
        -- removes product with action.payload id */}
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
