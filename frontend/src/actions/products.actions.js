import axios from 'axios';
import actionTypes from '../action_types/action.types';

export const listProducts =
  (keyword = '', brand = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&brand=${brand}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: actionTypes.PRODUCT_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: actionTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST });
      console.log('review', review);

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_TOP_RATED_REQUEST });

    const { data } = await axios.get(`/api/products/top`);
    console.log(data);

    dispatch({
      type: actionTypes.PRODUCT_TOP_RATED_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
