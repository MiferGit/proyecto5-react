import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Search from "../components/pokedex/Search";
import Filters from "../components/pokedex/Filters";
import PokemonList from "../components/pokedex/PokemonList";
import PokemonCard from "../components/PokemonCard";
import { useNameContext } from "../contexts/nameContext";
import "../styles/Pokedex.css";

function Pokedex() {
  const [name] = useNameContext();
  const [pokemons, setPokemons, loading, error] = useFetch();
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    setPokemons("https://pokeapi.co/api/v2/pokemon");
  };

  const handleSearch = (value) => {
    if (!value) {
      setIsFiltering(false);
      setPokemonUrl(null);
      setPokemons("https://pokeapi.co/api/v2/pokemon");
    } else {
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}/`);
    }
  };

  const handleTypeFilter = (type) => {
    if (!type) {
      setIsFiltering(false);
      setPokemons("https://pokeapi.co/api/v2/pokemon");
    } else {
      setIsFiltering(true);
      setPokemons(`https://pokeapi.co/api/v2/type/${type}`);
    }
    console.log(type);
  };

  const onNext = () => {
    setPokemons(pokemons?.next);
  };

  const onPrev = () => {
    setPokemons(pokemons?.previous);
  };

  const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;

  //********************************************************* */
  return (
    <div className="pokedex">
      <Link className="pokedex__link-v" to="/">
        {" "}
        ↩ Volver
      </Link>

      <div className="pokedex__container">
        <div className="pokedex__header">
          <h2 className="pokdex__welcome">
            Bienvenido <span className="pokdex__name">{name}</span>
          </h2>
          <p className="pokedex__tex">
            ¡Aqui podras encontrar tu pokemon favorito!
          </p>
        </div>

        <div className="pokedex__form">
          <Search handleSearch={handleSearch} />
          <Filters handleTypeFilter={handleTypeFilter} />
        </div>

        <div className="pokedex__btns">
          <button
            className="pokedex__btns-go"
            onClick={onPrev}
            disabled={!pokemons?.previous}
          >
            Anterior
          </button>
          <button
            className="pokedex__btns-go"
            onClick={onNext}
            disabled={!pokemons?.next}
          >
            Siguiente
          </button>
        </div>

        <div className="pokedex__cards">
          {loading && <div className="loading">Cargando...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && pokemonUrl ? (
            <PokemonCard url={pokemonUrl} />
          ) : (
            !loading &&
            !error && (
              <PokemonList pokemons={pokemonsArray} isFiltering={isFiltering} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export { Pokedex };
