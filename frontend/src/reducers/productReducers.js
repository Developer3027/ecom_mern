import productsTypes from '../action_types/product.types';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productsTypes.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        product: []
      };
    case productsTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case productsTypes.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case productsTypes.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case productsTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };
    case productsTypes.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
