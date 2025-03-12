import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";

const Buscador = () => {
  const { terminoBusqueda, setTerminoBusqueda } = useContext(VideojuegosContext);

  return (
    <input
      type="text"
      value={terminoBusqueda}
      onChange={(e) => setTerminoBusqueda(e.target.value)}
      placeholder="Buscar videojuegos..."
    />
  );
}

export default Buscador;
