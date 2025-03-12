import { VideojuegosProvider } from "./context/VideojuegosContext";
import Buscador from "./components/Buscador";
import ListaVideojuegos from "./components/ListaVideojuegos";
import MenuCategorias from "./components/MenuCategorias";
import MenuPlataformas from "./components/MenuPlataformas";
import DetalleVideojuego from "./components/DetalleVideojuego";
import "./App.css";

function App() {
  return (
    <VideojuegosProvider>
      <h1>Catálogo de Videojuegos</h1>
      <MenuCategorias />
      <MenuPlataformas />
      <Buscador />
      <ListaVideojuegos />
      <DetalleVideojuego />
    </VideojuegosProvider>
  );
}

export default App;
