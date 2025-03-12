import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";
import "./DetalleVideojuego.css"; // Asegúrate de importar los estilos

const DetalleVideojuego = () => {
  const { videojuegoSeleccionado, setVideojuegoSeleccionado, eliminarVideojuego } = useContext(VideojuegosContext);

  if (!videojuegoSeleccionado) return null;

  return (
    <div className="modal-overlay" onClick={() => setVideojuegoSeleccionado(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{videojuegoSeleccionado.nombre}</h2>
        <img src={videojuegoSeleccionado.url_imagen} alt={videojuegoSeleccionado.nombre} width="300" />
        <p>{videojuegoSeleccionado.descripcion}</p>
        <p>Fecha de lanzamiento: {videojuegoSeleccionado.fecha_lanzamiento}</p>
        <p>Compañía: {videojuegoSeleccionado.compania}</p>
        <p>Precio: {videojuegoSeleccionado.precio} €</p>
        <button onClick={() => setVideojuegoSeleccionado(null)}>Cerrar</button>
        <button onClick={() => eliminarVideojuego(videojuegoSeleccionado.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default DetalleVideojuego;