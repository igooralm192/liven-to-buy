import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Welcome from '../views/Welcome'
import SignIn from '../views/SignIn'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route component={Welcome} path="/welcome" />
        <Route component={SignIn} path="/sign-in" />

        <Redirect exact from="/" to="/welcome" />
      </Switch>
    </Router>
  )
}

export default Routes
