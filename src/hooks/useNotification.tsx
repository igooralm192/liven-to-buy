import React, { useCallback, useContext, useState } from 'react'

import Notification from '../components/Notification'

interface Notification {
  open: boolean
  title: string
  description: string
}

interface NotificationData {
  notification: Notification
  showNotification: (title: string, description: string) => void
  hideNotification: () => void
}

export const NotificationContext = React.createContext<NotificationData>(
  {} as NotificationData,
)

export const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    title: '',
    description: '',
  })

  const showNotification = useCallback((title: string, description: string) => {
    setNotification({
      open: true,
      title,
      description,
    })
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(oldNotification => ({
      ...oldNotification,
      open: false,
    }))
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      <Notification />
    </NotificationContext.Provider>
  )
}

const useNotification = (): NotificationData => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }

  return context
}

export default useNotification
