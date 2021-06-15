import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { eventReducer } from './reducers/eventReducers'
import { userLoginReducer } from './reducers/userReducers'
import { contractorReducer } from './reducers/contractorReducers'
import { productReducer } from './reducers/productReducer'
import { invoiceReducer } from './reducers/invoiceReducer'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  contractors: contractorReducer,
  products: productReducer,
  invoices: invoiceReducer,
}) //all reducers combined

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} //when store loads - states

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
