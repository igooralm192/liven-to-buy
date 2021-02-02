import React from 'react'

import './styles.css'

const VisitantLayout: React.FC = ({ children }) => {
  return (
    <main id="visitant-container">
      <section id="visitant-background">Back</section>
      <section id="visitant-content">{children}</section>
    </main>
  )
}

export default VisitantLayout
