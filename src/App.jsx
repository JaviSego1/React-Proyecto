import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VideojuegosProvider } from "./context/VideojuegosContext";
import { AuthProvider } from "./context/AuthContext"; // El contexto AuthProvider
import NavBar from "./components/NavBar"; // Importa el NavBar
import Buscador from "./components/Buscador";
import ListaVideojuegos from "./components/ListaVideojuegos";
import MenuCategorias from "./components/MenuCategorias";
import MenuPlataformas from "./components/MenuPlataformas";
import DetalleVideojuego from "./components/DetalleVideojuego";
import Login from "./components/Login"; // Componente de login
import Register from "./components/Register"; // Componente de registro
import "./App.css";

function App() {
  return (
    <AuthProvider> {/* Envolvemos toda la app con AuthProvider */}
      <Router>
        <NavBar /> {/* Colocamos NavBar aquí para que aparezca en todas las rutas */}
        <Routes>
          {/* Redirige la ruta raíz '/' al login si no estás logueado, si no al catálogo */}
          <Route path="/" element={<Login />} />

          {/* Ruta de registro */}
          <Route path="/registro" element={<Register />} />

          {/* Ruta protegida, solo accesible si estás logueado */}
          <Route path="/videojuegos" element={
            <VideojuegosProvider>
              <h1>Catálogo de Videojuegos</h1>
              <MenuCategorias />
              <MenuPlataformas />
              <Buscador />
              <ListaVideojuegos />
              <DetalleVideojuego />
            </VideojuegosProvider>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
