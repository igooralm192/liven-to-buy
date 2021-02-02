import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Welcome from '../views/Welcome'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route component={Welcome} path="/welcome" />

        <Redirect exact from="/" to="/welcome" />
      </Switch>
    </Router>
  )
}

export default Routes
