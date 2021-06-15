import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,

} from '../constants/userConstants'



export const userLoginReducer = (state = {}, action) => {

  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    case UPDATE_USER_PASSWORD_REQUEST:
      return {...state}
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {...state, error: false}
    case UPDATE_USER_PASSWORD_FAIL:
      return {...state, error: true}
    case UPDATE_USER_REQUEST:
      return {...state}
    case UPDATE_USER_SUCCESS:
      return {...state, error: false}
    case UPDATE_USER_FAIL:
      return {...state, error: true}
    default:
      return state
  }
}
