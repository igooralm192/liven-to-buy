import React from 'react'

import './styles.css'

const VisitantLayout: React.FC = ({ children }) => {
  return (
    <main id="visitant-container">
      <section id="visitant-background" />
      {/* <section id="visitant-content"></section> */}
      {children}
    </main>
  )
}

export default VisitantLayout
