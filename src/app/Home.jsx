import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { types, useNameContext } from "../contexts/nameContext";
import "../styles/Home.css";

function Home() {
  const inputRef = useRef();
  const [name, dispatch] = useNameContext();
  const navigate = useNavigate();

  const setName = () => {
    dispatch({
      type: types.SET_NAME,
      payload: inputRef.current.value.trim(),
    });
    inputRef.current.value = "";
    navigate("/pokedex");
  };

  const clearName = () => {
    dispatch({
      type: types.CLEAR_NAME,
    });
  };

  return (
    <div className="home">
      <h1 className="home__title">
        {" "}
        {'"'}POKÉMON{'"'}
      </h1>
      <h2 className="home__subtitle">
        ¡Bienvenido{" "}
        {name ? (
          <>
            de nuevo, <span className="home__name">{name}</span>
          </>
        ) : (
          "Entrenador"
        )}
        !
      </h2>

      <div>
        {name ? (
          <>
            <div className="home__exit">
              <p className="home__text">
                ¡Continuemos con tu viaje! 👉 {''}
                <Link to="/pokedex" className="home__link">
                  Pokedex
                </Link>
              </p>
              <button className="home__btn btn--radius" onClick={clearName}>
                Salir
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="home__text">Para poder comenzar, dame tu nombre</p>
            <div className="home__search">
              <input
                className="home__input"
                ref={inputRef}
                type="text"
                placeholder="Tu nombre..."
              />
              <button className="home__btn" onClick={setName}>
                Comenzar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export { Home };
