import { Link } from "react-router-dom"; // Si estás utilizando react-router
import "./NavBar.css"; // Asegúrate de tener el archivo CSS para darle estilo

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Enlace a los videojuegos */}
        <h1>Videojuegos</h1> {/* Puedes dejarlo aquí o en otro lugar si lo prefieres */}
        
        {/* Contenedor para los enlaces alineados a la derecha */}
        <div className="nav-right">
        <Link to="/videojuegos" className="nav-link">Videojuegos</Link>
          <Link to="/" className="nav-link">Login</Link>
          <Link to="/registro" className="nav-link">Registro</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
