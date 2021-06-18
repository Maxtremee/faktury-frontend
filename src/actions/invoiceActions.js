import axios from 'axios'
import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  GET_INVOICE_DETAILS_REQUEST,
  GET_INVOICE_DETAILS_SUCCESS,
  GET_INVOICE_DETAILS_FAIL,
  GET_INVOICE_PDF_REQUEST,
  GET_INVOICE_PDF_SUCCESS,
  GET_INVOICE_PDF_FAIL,
  EDIT_INVOICE_REQUEST,
  EDIT_INVOICE_SUCCESS,
  EDIT_INVOICE_FAIL,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAIL,
} from '../constants/invoiceConstants'
import checkToken from '../utils/checkToken'
import { history } from '../App'

export const getInvoices = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_INVOICES_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if (!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error('Token invalid')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.get(
      `${window.env.API_URL}/invoice/?searchstr=`,
      config
    )
    dispatch({
      type: GET_INVOICES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_INVOICES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getInvoicePdf = (invoiceId) => async (dispatch, getState) => {
  dispatch({
    type: GET_INVOICE_PDF_REQUEST,
  })
  try {
    const { userInfo } = getState().userLogin
    
    await fetch(
      `${window.env.API_URL}/invoice/${invoiceId}/pdf`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${userInfo.accessToken}`
            }
        })
        .then(response => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob],{
            type: "application/pdf"
          }));
          window.open(url);
        })
    //   const content = response.headers['content-type'];
    //   download(response.data, 'filename.pdf', content)

    dispatch({
      type: GET_INVOICE_PDF_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: GET_INVOICE_PDF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getInvoiceDetails = (invoiceId) => async (dispatch, getState) => {
  dispatch({
    type: GET_INVOICE_DETAILS_REQUEST,
  })
  try {
    const { invoices } = getState().invoices
    const invoice = invoices.filter((p) => p.id === invoiceId)[0]

    dispatch({
      type: GET_INVOICE_DETAILS_SUCCESS,
      payload: invoice,
    })
  } catch (error) {
    dispatch({
      type: GET_INVOICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createInvoice = (invoiceData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_INVOICE_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if (!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error('Token invalid')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.post(
      `${window.env.API_URL}/invoice`,
      JSON.stringify(invoiceData),
      config
    )
    dispatch({
      type: CREATE_INVOICE_SUCCESS,
      payload: { ...invoiceData, ...data },
    })
  } catch (error) {
    dispatch({
      type: CREATE_INVOICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editInvoice = (invoiceData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_INVOICE_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if (!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error('Token invalid')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    await axios.put(
      `${window.env.API_URL}/invoice/${invoiceData.id}`,
      JSON.stringify(invoiceData),
      config
    )
    dispatch({
      type: EDIT_INVOICE_SUCCESS,
      payload: invoiceData,
    })
  } catch (error) {
    dispatch({
      type: EDIT_INVOICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteInvoice = (invoiceId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_INVOICE_REQUEST,
    })
    const { userInfo } = getState().userLogin
    if (!checkToken(userInfo.accessToken)) {
      history.push('/invalidtoken')
      throw Error('Token invalid')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    await axios.delete(`${window.env.API_URL}/invoice/${invoiceId}`, config)
    dispatch({
      type: DELETE_INVOICE_SUCCESS,
      payload: invoiceId,
    })
  } catch (error) {
    dispatch({
      type: DELETE_INVOICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
