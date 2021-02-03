import React from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import UserLayout from '../layout/User'

import { AppState } from '../store'

type Props = RouteProps & {
  component: React.FC<RouteComponentProps>
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...routeProps
}) => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)

  return (
    <Route
      {...routeProps}
      render={props => {
        return isAuthenticated ? (
          <UserLayout>
            <Component {...props} />
          </UserLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/welcome',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
