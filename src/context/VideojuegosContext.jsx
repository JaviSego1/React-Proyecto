import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext, TOKEN_KEY } from "../context/AuthContext"; // Importamos el AuthContext
import axios from 'axios'; // Importamos axios

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
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // Reemplazamos fetch por axios
      axios.get("http://localhost:3001/videojuegos", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => setVideojuegos(response.data));

      axios.get("http://localhost:3001/categorias", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => {
          setCategorias(response.data);
          setCategoriasSeleccionadas(response.data.map(categoria => categoria.id));  // Marcar todas las categorías por defecto
        });

      axios.get("http://localhost:3001/plataformas", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => {
          setPlataformas(response.data);
          setPlataformasSeleccionadas(response.data.map(plataforma => plataforma.id));  // Marcar todas las plataformas por defecto
        });
    }
  }, [user]);

  const eliminarVideojuego = (id) => {
    const token = localStorage.getItem(TOKEN_KEY);
    // Reemplazamos fetch por axios
    axios.delete(`http://localhost:3001/videojuegos/${id}`, {
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
