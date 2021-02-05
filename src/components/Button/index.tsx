import React, { ButtonHTMLAttributes } from 'react'

import './styles.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // size?: 'small' | 'large'
}

const Button: React.FC<Props> = ({
  // size = 'large',
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} type="button" className={`${className} btn`}>
      {children}
    </button>
  )
}

export default Button
