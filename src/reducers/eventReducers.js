import {
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL
} from '../constants/eventConstants'

export const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true }
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, eventData: action.payload }
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
