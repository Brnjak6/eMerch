import React, { useState, createContext } from "react";

export const InputDataContext = createContext();

export const DataProvider = (props) => {
  const [inputData, setInputData] = useState(false);

  return (
    <InputDataContext.Provider value={[inputData, setInputData]}>
      {props.children}
    </InputDataContext.Provider>
  );
};
