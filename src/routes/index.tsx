import React from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'

import Welcome from '../views/Welcome'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'

import Products from '../views/Products'
import Cart from '../views/Cart'
import Purchase from '../views/Purchase'

const Routes: React.FC = () => {
  return (
    <Router>
      <ProtectedRoute component={Welcome} path="/welcome" />
      <ProtectedRoute component={SignIn} path="/sign-in" />
      <ProtectedRoute component={SignUp} path="/sign-up" />

      <PrivateRoute component={Products} path="/products" />
      <PrivateRoute component={Cart} path="/cart" />
      <PrivateRoute component={Purchase} path="/purchase" />

      <Redirect exact from="/" to="/welcome" />
    </Router>
  )
}

export default Routes
