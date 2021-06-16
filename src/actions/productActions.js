import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'
import { history } from '../App'
import curlize from 'axios-curlirize'
import checkToken from '../utils/checkToken'

curlize(axios)

export const getProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if(!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error("Token invalid")
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.get(
      `${window.env.API_URL}/product/?searchstr=`,
      config
    )
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductDetails = (productId) => async(dispatch, getState) => {
  dispatch({
    type: GET_PRODUCT_DETAILS_REQUEST
  })
  try {
    const {products} = getState().products
    const product = products.filter(p => p.id === productId)[0]

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: product
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if(!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error("Token invalid")
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const product = {
      ...productData,
      currency: 'PLN',
    }
    const {data} = await axios.post(
      `${window.env.API_URL}/product`,
      JSON.stringify(product),
      config
    )

    console.log(data)
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: {...product, ...data}
    })
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_PRODUCT_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if(!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error("Token invalid")
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    await axios.put(
      `${window.env.API_URL}/product/${productData.id}`,
      JSON.stringify(productData),
      config
    )
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: productData,
    })
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if(!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error("Token invalid")
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    await axios.delete(`${window.env.API_URL}/product/${productId}`, config)
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
