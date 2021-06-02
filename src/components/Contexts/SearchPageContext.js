import React, { useState, createContext } from "react";

export const SearchPageContext = createContext();

export const SearchPageProvider = (props) => {
  const [page, setPage] = useState(1);

  return (
    <SearchPageContext.Provider value={[page, setPage]}>
      {props.children}
    </SearchPageContext.Provider>
  );
};
