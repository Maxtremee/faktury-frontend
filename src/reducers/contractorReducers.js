import {
  ADD_CONTRACTOR_REQUEST,
  ADD_CONTRACTOR_SUCCESS,
  ADD_CONTRACTOR_FAIL,
  DELETE_CONTRACTOR_REQUEST,
  DELETE_CONTRACTOR_SUCCESS,
  DELETE_CONTRACTOR_FAIL,
  EDIT_CONTRACTOR_REQUEST,
  EDIT_CONTRACTOR_SUCCESS,
  EDIT_CONTRACTOR_FAIL
} from '../constants/contractorConstants'

export const contractorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CONTRACTOR_REQUEST:
      return { loading: true }
    case ADD_CONTRACTOR_SUCCESS:
      //TODO add new contarctor to the state
      return { loading: false, contractors: action.payload }
    case ADD_CONTRACTOR_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_CONTRACTOR_REQUEST:
      return { loading: true }
    case DELETE_CONTRACTOR_SUCCESS:
      //TODO remove contarctor from the state
      return { loading: false, contractors: action.payload }
    case DELETE_CONTRACTOR_FAIL:
      return { loading: false, error: action.payload }
    case EDIT_CONTRACTOR_REQUEST:
      return { loading: true }
    case EDIT_CONTRACTOR_SUCCESS:
      //TODO edit contarctor in the state
      return { loading: false, contractors: action.payload }
    case EDIT_CONTRACTOR_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
