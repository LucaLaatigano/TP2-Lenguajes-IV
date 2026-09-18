import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi Sitio</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? 'active' : ''}>
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
