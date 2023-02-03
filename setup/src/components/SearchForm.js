import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const inputStr = useRef(null);

  const handleSubmit = (e) => {
    e.prventDefault();
  };

  useEffect(() => {
    inputStr.current.focus();
  }, []);

  const searchCocatail = () => {
    setSearchTerm(inputStr.current.value);
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search for your favorite cocktail</label>
          <input
            id="name"
            type="text"
            ref={inputStr}
            onChange={searchCocatail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
