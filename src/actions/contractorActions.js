import axios from 'axios'
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
} from '../constants/contractorConstants';


export const addContractor = (contractorData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CONTRACTOR_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/contractors',
      contractorData,
      config
    )
    console.log(data)
    dispatch({
      type: ADD_CONTRACTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_CONTRACTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const editContractor = (contractorData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CONTRACTOR_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(
      `/api/contractors/${contractorData.id}`,
      contractorData,
      config
    )
    dispatch({
      type: EDIT_CONTRACTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EDIT_CONTRACTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const deleteContractor = (contractorId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CONTRACTOR_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.delete(
      `/api/contractors/${contractorId}`,
      config
    )
    dispatch({
      type: DELETE_CONTRACTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_CONTRACTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}