import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './styles.css'

interface Props {
  open: boolean
  title: string
  description: string
  onClose: () => void
}

const Notification: React.FC<Props> = ({
  open,
  title,
  description,
  onClose,
}) => {
  return (
    <div className={`notification container ${open ? 'active' : ''}`}>
      <div className="notification header">
        <h3 className="notification title">{title}</h3>
        <FaTimes className="notification close" onClick={() => onClose()} />
      </div>
      <p className="notification description">{description}</p>
    </div>
  )
}

export default Notification
