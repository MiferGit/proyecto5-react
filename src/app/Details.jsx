import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { tipos } from "../utils/helpers";
import "../styles/Details.css";

function Details() {
  const params = useParams();
  const [pokemon, setPokemon] = useFetch();

  useEffect(() => {
    if (params.id) getPokemon();
  }, [params.name]);

  const getPokemon = () => {
    setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  };

  const types = pokemon?.types.map((type) => type.type.name);

  console.log(pokemon);

  //************************************************************ */
  return (
    <div className="details__container">
      <Link className="pokedex__link-v" to="/pokedex">
        {"↩"} Volver
      </Link>

      <div>
        <div className="details__box-picture">
          <div>
            <h2 className="details__box-name">{pokemon?.name}</h2>
            <span className="details__box-num">
              #{pokemon?.id?.toString().padStart(3, "0")}
            </span>
          </div>

          <img
            className="details__box-img"
            src={pokemon?.sprites?.other?.dream_world?.front_default}
            alt={pokemon?.name}
          />
        </div>

        <div className="details__container-items">
          {/* Stats  */}
          <div>
            <h3 className="details__subtitles">Stats</h3>
            <div className="details__full-item">
              <span>HP </span>
              <span>{pokemon?.stats[0]?.base_stat} ❇️</span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill hp"
                  style={{ width: `${pokemon?.stats[0]?.base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="details__full-item">
              <span>Ataque </span>
              <span>{pokemon?.stats[1]?.base_stat} 🦾</span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill ataque"
                  style={{ width: `${pokemon?.stats[1]?.base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="details__full-item">
              <span>Defensa </span>
              <span>{pokemon?.stats[2]?.base_stat} 🛡️</span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill defensa"
                  style={{ width: `${pokemon?.stats[2]?.base_stat}%` }}
                ></div>
              </div>
            </div>
            <div className="details__full-item">
              <span>Velocidad </span>
              <span>{pokemon?.stats[5]?.base_stat} 🦿</span>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill velocidad"
                  style={{ width: `${pokemon?.stats[5]?.base_stat}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="details__subcontainer">
            {/* Morfologia */}
            <div>
              <h3 className="details__subtitles">Morfologia</h3>
              <span>
                {"✨"}
                <span className="details__subtitle-run">Peso </span>
                <span className="details__subtitle-way">{pokemon?.weight} hg</span>
              </span>{" "}
              <span>
                {"✨"}
                <span className="details__subtitle-run">Altura </span>
                <span className="details__subtitle-way">{pokemon?.height} dm</span>
              </span>
            </div>

            {/* tipo */}
            <div>
              <h3 className="details__subtitles">Tipo</h3>
              <div>
                {types?.map((type) => (
                  <span className="details__subtitle-run" key={type}>
                    {" "}
                    {"✨"}
                    {tipos[type]}
                  </span>
                ))}
              </div>
            </div>

            {/* habilidades */}
            <div>
              <h3 className="details__subtitles">Habilidades</h3>
              <div>
                {pokemon?.abilities?.map((data) => (
                  <span className="details__subtitle-run" key={data.ability.name}>
                    {" "}
                    {"✨"}
                    {data.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movimientos */}
        <div>
          <h3 className="details__subtitles">Movimientos</h3>
          <div className="details__moves">
            {pokemon?.moves?.map((data) => (
              <span key={data.move.name}>
                {"🍂"}
                {data.move.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Details };
