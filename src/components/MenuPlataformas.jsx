import { useContext } from "react";
import { VideojuegosContext } from "../context/VideojuegosContext";

const MenuPlataformas = () => {
  const { plataformas, plataformasSeleccionadas, setPlataformasSeleccionadas } = useContext(VideojuegosContext);

  const handleChange = (platId) => {
    if (plataformasSeleccionadas.includes(platId)) {
      setPlataformasSeleccionadas(plataformasSeleccionadas.filter((id) => id !== platId));
    } else {
      setPlataformasSeleccionadas([...plataformasSeleccionadas, platId]);
    }
  };

  return (
    <div>
      <h3>Plataformas</h3>
      {plataformas.map((plataforma) => (
        <label key={plataforma.id}>
          <input
            type="checkbox"
            checked={plataformasSeleccionadas.includes(plataforma.id)}
            onChange={() => handleChange(plataforma.id)}
          />
          {plataforma.nombre}
        </label>
      ))}
    </div>
  );
}

export default MenuPlataformas;
