import {
  ADD_CONTRACTOR_REQUEST,
  ADD_CONTRACTOR_SUCCESS,
  ADD_CONTRACTOR_FAIL,
  DELETE_CONTRACTOR_REQUEST,
  DELETE_CONTRACTOR_SUCCESS,
  DELETE_CONTRACTOR_FAIL,
  EDIT_CONTRACTOR_REQUEST,
  EDIT_CONTRACTOR_SUCCESS,
  EDIT_CONTRACTOR_FAIL,
  GET_CONTRACTORS_REQUEST,
  GET_CONTRACTORS_SUCCESS,
  GET_CONTRACTORS_FAIL,
  GET_CONTRACTOR_DETAILS_REQUEST,
  GET_CONTRACTOR_DETAILS_SUCCESS,
  GET_CONTRACTOR_DETAILS_FAIL,
} from '../constants/contractorConstants'

export const contractorReducer = (state = { contractors: [] }, action) => {
  switch (action.type) {
    case GET_CONTRACTORS_REQUEST:
      return { loading: true, contractors: [] }
    case GET_CONTRACTORS_SUCCESS:
      return { loading: false, contractors: action.payload }
    case GET_CONTRACTORS_FAIL:
      return { loading: false, error: action.payload }

    case ADD_CONTRACTOR_REQUEST:
      return { ...state, loading: true }
    case ADD_CONTRACTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        contractors: [...state.contractors, action.payload],
      }
    case ADD_CONTRACTOR_FAIL:
      return { ...state, error: action.payload }

    case DELETE_CONTRACTOR_REQUEST:
      return { ...state }
    case DELETE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: [
          ...state.contractors.filter((i, _) => i.id !== action.payload),
        ],
      }
    case DELETE_CONTRACTOR_FAIL:
      return { ...state, error: action.payload }
    case EDIT_CONTRACTOR_REQUEST:
      return { ...state }
    case EDIT_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: [
          ...state.contractors.map((i, _) =>
            i.id === action.payload.id ? action.payload : i
          ),
        ],
        editedContractor: {}
      }
    case EDIT_CONTRACTOR_FAIL:
      return { ...state, error: action.payload }

    case GET_CONTRACTOR_DETAILS_REQUEST:
      return {...state, loading:true, editedContractor: {}}
    case GET_CONTRACTOR_DETAILS_SUCCESS:
      return {...state, loading:false, editedContractor: action.payload}
    case GET_CONTRACTOR_DETAILS_FAIL:
      return {...state, error: action.payload}
    default:
      return state
  }
}
