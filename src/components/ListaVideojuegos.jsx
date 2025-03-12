import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";

const ListaVideojuegos = () => {
  const { filtrarVideojuegos, setVideojuegoSeleccionado, categorias, plataformas } =
    useContext(VideojuegosContext);

  return (
    <div>
      {filtrarVideojuegos().map((videojuego) => {
        // Obtener los nombres de las categorías del videojuego
        const categoriasVideojuego = videojuego.categorias.map((catId) => {
          const categoria = categorias.find((cat) => cat.id === catId.toString()); // Convertir a string
          return categoria ? categoria.nombre : "Categoría desconocida";
        });

        // Obtener los nombres de las plataformas del videojuego
        const plataformasVideojuego = videojuego.plataformas.map((platId) => {
          const plataforma = plataformas.find((plat) => plat.id === platId.toString()); // Convertir a string
          return plataforma ? plataforma.nombre : "Plataforma desconocida";
        });

        return (
          <div key={videojuego.id} onClick={() => setVideojuegoSeleccionado(videojuego)}>
            <h2>{videojuego.nombre}</h2>
            <img src={videojuego.url_imagen} alt={videojuego.nombre} width="200" />
            <p>{videojuego.descripcion.substring(0, 100)}...</p>
            <p>Precio: {videojuego.precio} €</p>
            <p>
              <strong>Categorías:</strong> {categoriasVideojuego.join(", ")}
            </p>
            <p>
              <strong>Plataformas:</strong> {plataformasVideojuego.join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ListaVideojuegos;