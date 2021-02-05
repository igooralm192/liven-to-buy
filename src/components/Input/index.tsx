import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface IconProps {
  className?: string
}

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon: React.FC<IconProps>
  error?: string
  // size?: 'small' | 'large'
}

const Input: React.FC<Props> = ({
  icon: Icon,
  error = null,
  // size = 'large',
  className,
  ...props
}) => {
  return (
    <fieldset className={`form-control ${error && 'error'}`}>
      <input {...props} className={`${className} input`} />
      <Icon className="icon" />
      <span className="error-message">{error}</span>
    </fieldset>
  )
}

export default Input
