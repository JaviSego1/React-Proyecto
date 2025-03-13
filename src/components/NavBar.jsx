import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault(); // Evita la navegación predeterminada del enlace
    logout();
    navigate("/"); // Redirige al login
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1>Videojuegos Javier</h1>
        
        <div className="nav-right">
          {user.isLogged && <Link to="/videojuegos" className="nav-link">Videojuegos</Link>}
          {!user.isLogged ? (
            <>
              <Link to="/" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Registro</Link>
            </>
          ) : (
            <a href="#" onClick={handleLogout} className="nav-link">
              Cerrar sesión
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
