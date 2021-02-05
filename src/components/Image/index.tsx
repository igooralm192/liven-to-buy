import React, { useState } from 'react'

import './styles.css'

type Props = {
  src: string
  alt: string
  className?: string
}

const Image: React.FC<Props> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!loaded && error) {
    return (
      <div className={`${className} image-error`}>
        <span>x</span>
      </div>
    )
  }

  return (
    <div className={`${className} image-loading`}>
      <img
        loading="lazy"
        src={src}
        alt={loaded ? alt : ''}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

export default Image
