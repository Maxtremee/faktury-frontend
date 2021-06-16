import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    GET_INVOICE_DETAILS_REQUEST,
    GET_INVOICE_DETAILS_SUCCESS,
    GET_INVOICE_DETAILS_FAIL,
    EDIT_INVOICE_REQUEST,
    EDIT_INVOICE_SUCCESS,
    EDIT_INVOICE_FAIL,
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAIL,
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL
} from '../constants/invoiceConstants'

export const invoiceReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case GET_INVOICES_REQUEST:
      return { loading: true, invoices: [] }
    case GET_INVOICES_SUCCESS:
      return { loading: false, invoices: action.payload }
    case GET_INVOICES_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_INVOICE_REQUEST:
      return { ...state, loading: true }
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices, action.payload],
      }
    case CREATE_INVOICE_FAIL:
      return { ...state, error: action.payload }

    case DELETE_INVOICE_REQUEST:
      return { ...state, loading: true }
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices.filter((i, _) => i.id != action.payload)],
      }
    case DELETE_INVOICE_FAIL:
      return { ...state, error: action.payload }
    case EDIT_INVOICE_REQUEST:
      return { ...state}
    case EDIT_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [
          ...state.invoices.map((i, _) =>
            i.id == action.payload.id ? action.payload : i
          ),
        ],
        editedInvoice: {} 
      }
    case EDIT_INVOICE_FAIL:
      return { ...state, error: action.payload }

    case GET_INVOICE_DETAILS_REQUEST:
      return {...state, loading: true, editedInvoice: {}}
    case GET_INVOICE_DETAILS_SUCCESS:
      return {...state, loading: false, editedInvoice: action.payload}
    case GET_INVOICE_DETAILS_FAIL:
      return {...state, error: action.payload}
    default:
      return state
  }
}
