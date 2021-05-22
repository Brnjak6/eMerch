import React, { useState, createContext } from "react";

export const OffsetContext = createContext();

export const OffsetProvider = (props) => {
  const [offset, setOffset] = useState(1);
  return (
    <OffsetContext.Provider value={[offset, setOffset]}>
      {props.children}
    </OffsetContext.Provider>
  );
};
