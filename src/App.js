import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import TestScreen from './screens/TestScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PageNotFoundScreen from './screens/PageNotFoundScreen'
import AccessDeniedScreen from './screens/AccessDeniedScreen'
import HomeScreen from './screens/HomeScreen'
import ContractorScreen from './screens/ContractorScreen'
import AddContractorScreen from './screens/AddContractorScreen'
import ProductScreen from './screens/ProductScreen'
import HistoryScreen from './screens/HistoryScreen'
import InvoiceScreen from './screens/InvoiceScreen'
import AddInvoiceScreen from './screens/AddInvoiceScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserDetailsScreen from './screens/UserDetailsScreen'

import AddProductScreen from './screens/AddProductScreen'

import Footer from './components/Footer'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Container fluid style={{ marginTop: '80px' }}>
            <Switch>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/test' component={TestScreen} exact />

              <Route path='/profile' component={UserDetailsScreen} exact />

              <Route path='/invoices' component={InvoiceScreen} exact />
              <Route path='/invoices/add' component={AddInvoiceScreen} exact />

              <Route path='/contractors' component={ContractorScreen} exact />
              <Route path='/contractors/add' component={AddContractorScreen} exact />
              <Route path='/contractors/:id' component={AddContractorScreen} exact />
              

              <Route path='/products' component={ProductScreen} exact />
              <Route path='/products/add' component={AddProductScreen} exact />
              <Route
                path='/products/:id'
                component={AddProductScreen}
                exact
              />

              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />

              <Route path='/403' component={AccessDeniedScreen} />
              <Route component={PageNotFoundScreen} />
            </Switch>
          </Container>
        </main>
        <footer>
          <Footer>{'Program do tworzenia faktur'}</Footer>
        </footer>
      </Router>
    </>
  )
}

export default App
