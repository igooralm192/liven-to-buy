import React, { useCallback, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

import useNotification from '../../hooks/useNotification'

import './styles.css'

interface Props {
  onClose?: () => void
}

const Notification: React.FC<Props> = ({ onClose }) => {
  const { notification, hideNotification } = useNotification()

  const { open, title, description } = notification

  const handleClose = useCallback(() => {
    hideNotification()
    if (onClose) onClose()
  }, [hideNotification, onClose])

  useEffect(() => {
    if (!open) return () => {}

    const timeout = setTimeout(handleClose, 5000)

    return () => {
      clearTimeout(timeout)
      handleClose()
    }
  }, [open, handleClose])

  return (
    <div className={`notification container ${open ? 'active' : ''}`}>
      <div className="notification header">
        <h3 className="notification title">{title}</h3>
        <FaTimes className="notification close" onClick={handleClose} />
      </div>
      <p className="notification description">{description}</p>
    </div>
  )
}

export default Notification
