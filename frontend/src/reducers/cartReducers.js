import actionTypes from '../action_types/action.types';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const items = action.payload;

      const itemExists = state.cartItems.find(
        (item) => item.product === items.product
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === itemExists.product ? items : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, items]
        };
      }
    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        )
      };
    default:
      return state;
  }
};
