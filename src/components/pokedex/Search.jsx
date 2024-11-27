import { useRef } from "react";
import { FaSearchengin } from "react-icons/fa";
import '/src/styles/Search.css'

function Search({ handleSearch }) {
  const inputRef = useRef();

  const onSearch = () => {
    handleSearch(inputRef.current.value.toLowerCase().trim());
    inputRef.current.value = ''
  };
  //**************************************************** */
  return (
    <div className="search">
      <div className="search__input">
        <FaSearchengin />
        <input className="search__input-inner" type="text" placeholder="Buscar pokemon..." ref={inputRef} />
      </div>
      <button className="search__btn" onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default Search;
