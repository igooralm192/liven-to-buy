import React, { useEffect } from 'react'

import './styles.css'

import useNotification from '../../hooks/useNotification'

const VisitantLayout: React.FC = ({ children }) => {
  const { notification, hideNotification } = useNotification()

  useEffect(() => {
    if (notification.open) hideNotification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main id="visitant-container">
      <section id="visitant-background" />
      {children}
    </main>
  )
}

export default VisitantLayout
