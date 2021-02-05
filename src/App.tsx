import React from 'react'

import { NotificationProvider } from './hooks/useNotification'

import Routes from './routes'

const App: React.FC = () => {
  return (
    <>
      <NotificationProvider>
        <Routes />
      </NotificationProvider>
    </>
  )
}

export default App
