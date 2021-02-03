import React from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import { AppState } from '../store'

type Props = RouteProps & {
  component: React.FC<RouteComponentProps>
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...routeProps
}) => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)

  return (
    <Route
      {...routeProps}
      render={props => {
        return !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/products',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
