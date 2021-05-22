import React, { useState, createContext } from "react";

export const InputContext = createContext();

export const InputProvider = (props) => {
  const [input, setInput] = useState("");

  return (
    <InputContext.Provider value={[input, setInput]}>
      {props.children}
    </InputContext.Provider>
  );
};
