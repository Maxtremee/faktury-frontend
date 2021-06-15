import axios from 'axios'

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/userConstants'

import env from 'react-dotenv'
import curlirize from 'axios-curlirize'

curlirize(axios)


export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    }
    const { data } = await axios.post(
      `${env.API_URL}/login`,
      JSON.stringify({login: email, password}),
      config
    )
    console.log(data)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const registerAccount = (accountData) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    }
    const { data } = await axios.post(
      `${env.API_URL}/signup`,
      JSON.stringify(accountData),
      config
    )
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: accountData,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const updatePassword = (passwordData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_PASSWORD_REQUEST,
    })
    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    let newPasswordData = {
      ...passwordData,
      id: userInfo.id
    }
    await axios.put(
      `${env.API_URL}/change-password`,
      JSON.stringify(newPasswordData),
      config
    )
    dispatch({
      type: UPDATE_USER_PASSWORD_SUCCESS,
      payload: newPasswordData,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_USER_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })
    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    let userProfile = {
      ...userData,
      id: userInfo.id
    }
    await axios.put(
      `${env.API_URL}/change-personal-info`,
      JSON.stringify(userProfile),
      config
    )
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: userProfile,
    })
    let localData = localStorage.getItem('userInfo')
    localStorage.setItem('userInfo', JSON.stringify({
      ...localData,
      ...userProfile
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}