import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext, TOKEN_KEY } from "../context/AuthContext"; // Importamos el AuthContext

// Asignando el contexto a una constante
const VideojuegosContext = createContext();

const VideojuegosProvider = ({ children }) => {
  const { user } = useContext(AuthContext);  // Usamos el AuthContext para obtener el usuario
  const [videojuegos, setVideojuegos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      fetch("http://localhost:3001/videojuegos", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => setVideojuegos(data));

      fetch("http://localhost:3001/categorias", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          setCategorias(data);
          setCategoriasSeleccionadas(data.map(categoria => categoria.id));  // Marcar todas las categorías por defecto
        });

      fetch("http://localhost:3001/plataformas", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          setPlataformas(data);
          setPlataformasSeleccionadas(data.map(plataforma => plataforma.id));  // Marcar todas las plataformas por defecto
        });
    }
  }, [user]);

  const eliminarVideojuego = (id) => {
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`http://localhost:3001/videojuegos/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(() => {
        setVideojuegos(videojuegos.filter((videojuego) => videojuego.id !== id));
        if (videojuegoSeleccionado?.id === id) {
          setVideojuegoSeleccionado(null);
        }
      })
      .catch((error) => console.error("Error al eliminar el videojuego:", error));
  };

  const filtrarVideojuegos = () => {
    return videojuegos.filter((videojuego) => {
      const coincideCategoria = categoriasSeleccionadas.length === 0 ||
        videojuego.categorias.some((catId) => categoriasSeleccionadas.includes(catId.toString()));
      const coincidePlataforma = plataformasSeleccionadas.length === 0 ||
        videojuego.plataformas.some((platId) => plataformasSeleccionadas.includes(platId.toString()));
      const coincideBusqueda = terminoBusqueda === "" ||
        videojuego.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        videojuego.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase());
      return coincideCategoria && coincidePlataforma && coincideBusqueda;
    });
  };

  // Usando la constante VideojuegosContext.Provider
  return (
    <VideojuegosContext.Provider value={{
      videojuegos,
      categorias,
      plataformas,
      categoriasSeleccionadas,
      setCategoriasSeleccionadas,
      plataformasSeleccionadas,
      setPlataformasSeleccionadas,
      terminoBusqueda,
      setTerminoBusqueda,
      videojuegoSeleccionado,
      setVideojuegoSeleccionado,
      eliminarVideojuego,
      filtrarVideojuegos
    }}>
      {children}
    </VideojuegosContext.Provider>
  );
};

export { VideojuegosContext, VideojuegosProvider };
