import React from 'react'

import './styles.css'

const UserLayout: React.FC = ({ children }) => {
  return (
    <div id="user-container">
      <header id="user-header">
        <div className="user content">
          <div className="user logo">Logo</div>
          <nav className="user actions">
            <div className="user action">Icon</div>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}

export default UserLayout
