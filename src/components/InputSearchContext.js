import React, { useState, createContext } from "react";

export const InputSearchContext = createContext();

export const SearchProvider = (props) => {
  const [inputData, setInputData] = useState(false);

  return (
    <InputSearchContext.Provider value={[inputData, setInputData]}>
      {props.children}
    </InputSearchContext.Provider>
  );
};
