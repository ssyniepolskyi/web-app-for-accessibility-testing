import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-4" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Створи свій список справ!</span>
        <ul role="menu" automation-id="navigation-menu" id="nav-mobile" className="right hide-on-med-and-down">
          <li role="menuitem" automation-id="menu-item" aria-label="Створити"><NavLink to="/create">Створити</NavLink></li>
          <li role="menuitem" automation-id="menu-item" aria-label="Справи"><NavLink to="/tasks">Справи</NavLink></li>
          <li role="menuitem" automation-id="menu-item" aria-label="Вийти"><a href="/" onClick={logoutHandler}>Вийти</a></li>
        </ul>
      </div>
    </nav>
  )
}
