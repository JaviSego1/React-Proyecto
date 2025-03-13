import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";
import "./DetalleVideojuego.css"; 

const DetalleVideojuego = () => {
  const { videojuegoSeleccionado, setVideojuegoSeleccionado, eliminarVideojuego, categorias, plataformas } =
    useContext(VideojuegosContext);

  if (!videojuegoSeleccionado) return null;

  const categoriasVideojuego = Array.isArray(videojuegoSeleccionado.categorias) ? 
    videojuegoSeleccionado.categorias.map((catId) => {
      const categoria = categorias.find((cat) => cat.id === catId.toString());
      return categoria ? categoria.nombre : "Categoría desconocida";
    }) : [];

  const plataformasVideojuego = Array.isArray(videojuegoSeleccionado.plataformas) ? 
    videojuegoSeleccionado.plataformas.map((platId) => {
      const plataforma = plataformas.find((plat) => plat.id === platId.toString());
      return plataforma ? plataforma.nombre : "Plataforma desconocida";
    }) : [];

  return (
    <div className="modal-overlay" onClick={() => setVideojuegoSeleccionado(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{videojuegoSeleccionado.nombre}</h2>
        <img src={videojuegoSeleccionado.url_imagen} alt={videojuegoSeleccionado.nombre} width="300" />
        <p>{videojuegoSeleccionado.descripcion}</p>
        <p><strong>Fecha de lanzamiento: </strong>{videojuegoSeleccionado.fecha_lanzamiento}</p>
        <p><strong>Compañía: </strong>{videojuegoSeleccionado.compania}</p>
        <p><strong>Precio: </strong>{videojuegoSeleccionado.precio} €</p>
        <p>
          <strong>Categorías:</strong> {categoriasVideojuego.length > 0 ? categoriasVideojuego.join(", ") : "Sin categorías"}
        </p>
        <p>
          <strong>Plataformas:</strong> {plataformasVideojuego.length > 0 ? plataformasVideojuego.join(", ") : "Sin plataformas"}
        </p>
        <button onClick={() => setVideojuegoSeleccionado(null)}>Cerrar</button>
        <button onClick={() => eliminarVideojuego(videojuegoSeleccionado.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default DetalleVideojuego;
