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
  GET_CONTRACTORS_REQUEST,
  GET_CONTRACTORS_SUCCESS,
  GET_CONTRACTORS_FAIL,
  GET_CONTRACTOR_DETAILS_REQUEST,
  GET_CONTRACTOR_DETAILS_SUCCESS,
  GET_CONTRACTOR_DETAILS_FAIL,
} from '../constants/contractorConstants'

export const getContractors = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONTRACTORS_REQUEST,
    })
    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.get(
      `${window.env.API_URL}/contractor/?searchstr=`,
      config
    )
    dispatch({
      type: GET_CONTRACTORS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_CONTRACTORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getContractorDetails = (contractorId) => async(dispatch, getState) => {
  dispatch({
    type: GET_CONTRACTOR_DETAILS_REQUEST
  })
  try {
    const {contractors} = getState().contractors
    const contractor = contractors.filter(c => c.id === contractorId)[0]

    dispatch({
      type: GET_CONTRACTOR_DETAILS_SUCCESS,
      payload: contractor
    })
  } catch (error) {
    dispatch({
      type: GET_CONTRACTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addContractor = (contractorData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CONTRACTOR_REQUEST,
    })
    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    await axios.post(`${window.env.API_URL}/contractor`, contractorData, config)
    dispatch({
      type: ADD_CONTRACTOR_SUCCESS,
      payload: contractorData,
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

export const editContractor =
  (contractorData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_CONTRACTOR_REQUEST,
      })
      const { userInfo } = getState().userLogin
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
      await axios.put(
        `${window.env.API_URL}/contractor/${contractorData.id}`,
        contractorData,
        config
      )
      dispatch({
        type: EDIT_CONTRACTOR_SUCCESS,
        payload: contractorData,
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

export const deleteContractor =
  (contractorId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_CONTRACTOR_REQUEST,
      })
      const { userInfo } = getState().userLogin
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
      await axios.delete(
        `${window.env.API_URL}/contractor/${contractorId}`,
        config
      )
      dispatch({
        type: DELETE_CONTRACTOR_SUCCESS,
        payload: contractorId,
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
