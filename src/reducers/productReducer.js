import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      }
    case ADD_PRODUCT_FAIL:
      return { ...state, error: action.payload }

    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products.filter((i, _) => i.id != action.payload)],
      }
    case DELETE_PRODUCT_FAIL:
      return { ...state, error: action.payload }
    case EDIT_PRODUCT_REQUEST:
      return { ...state}
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [
          ...state.products.map((i, _) =>
            i.id == action.payload.id ? action.payload : i
          ),
        ],
        editedProduct: {} 
      }
    case EDIT_PRODUCT_FAIL:
      return { ...state, error: action.payload }

    case GET_PRODUCT_DETAILS_REQUEST:
      return {...state, loading: true, editedProduct: {}}
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {...state, loading: false, editedProduct: action.payload}
    case GET_PRODUCT_DETAILS_FAIL:
      return {...state, error: action.payload}
    default:
      return state
  }
}
