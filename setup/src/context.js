import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoding] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoding(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map((cocktail) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strGlass: glass,
          } = cocktail;
          return { id, name, image, info, glass };
        });

        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }

      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchCocktails();
  }, [searchTerm, fetchCocktails]);
  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
