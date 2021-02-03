import React from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'

import Welcome from '../views/Welcome'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Products from '../views/Products'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute component={Welcome} path="/welcome" />
        <ProtectedRoute component={SignIn} path="/sign-in" />
        <ProtectedRoute component={SignUp} path="/sign-up" />

        <PrivateRoute component={Products} path="/products" />

        <Redirect exact from="/" to="/welcome" />
      </Switch>
    </Router>
  )
}

export default Routes
