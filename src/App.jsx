import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { VideojuegosProvider } from "./context/VideojuegosContext";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Importa el contexto de autenticación
import NavBar from "./components/NavBar"; // Importa el NavBar
import Buscador from "./components/Buscador";
import ListaVideojuegos from "./components/ListaVideojuegos";
import MenuCategorias from "./components/MenuCategorias";
import MenuPlataformas from "./components/MenuPlataformas";
import DetalleVideojuego from "./components/DetalleVideojuego";
import Login from "./components/Login"; // Componente de login
import Register from "./components/Register"; // Componente de registro
import { useContext } from "react";
import "./App.css";

// Componente de protección para rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.isLogged ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/videojuegos" element={
              <ProtectedRoute>
                <VideojuegosProvider>
                  <h1>Catálogo de Videojuegos</h1>
                  <MenuCategorias />
                  <MenuPlataformas />
                  <Buscador />
                  <ListaVideojuegos />
                  <DetalleVideojuego />
                </VideojuegosProvider>
              </ProtectedRoute>
              }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
