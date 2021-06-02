import React, { createContext } from "react";
import useLocalStorage from "../useLocalStorage";

export const ItemsInCartContext = createContext();

export const ItemsInCartList = (props) => {
  const [itemsInCart, setItemsInCart] = useLocalStorage("item", []);

  return (
    <ItemsInCartContext.Provider value={[itemsInCart, setItemsInCart]}>
      {props.children}
    </ItemsInCartContext.Provider>
  );
};
