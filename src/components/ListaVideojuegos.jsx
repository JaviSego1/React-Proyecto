import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";

const ListaVideojuegos = () => {
  const { filtrarVideojuegos, setVideojuegoSeleccionado } = useContext(VideojuegosContext);

  return (
    <div>
      {filtrarVideojuegos().map((videojuego) => (
        <div key={videojuego.id} onClick={() => setVideojuegoSeleccionado(videojuego)}>
          <h2>{videojuego.nombre}</h2>
          <img src={videojuego.url_imagen} alt={videojuego.nombre} width="200" />
          <p>{videojuego.descripcion.substring(0, 100)}...</p>
          <p>Precio: {videojuego.precio} €</p>
        </div>
      ))}
    </div>
  );
}

export default ListaVideojuegos;
