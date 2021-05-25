import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ItemsInCartContext } from "../components/ItemsInCartContext";

function ProductData({ price, id, value }) {
  const [itemsInCart, setItemsInCart] = useContext(ItemsInCartContext);
  const quantity = [1, 2, 3, 4, 5, 6, 7];
  const [chosenQuantity, setChosenQuantity] = useState(1);

  const quantityHandler = (quantity) => {
    setChosenQuantity(quantity.target.value);
  };

  useEffect(() => {
    setItemsInCart((prev) => {
      const newItems = prev.map((item) => {
        if (item.listing_id !== id) return item;
        return {
          ...item,
          value: (chosenQuantity * price).toFixed(2),
        };
      });
      return newItems;
    });
  }, [chosenQuantity]);

  return (
    <>
      <Quantity>
        Quantity:
        <Select value={chosenQuantity} onChange={(e) => quantityHandler(e)}>
          {quantity.map((number) => (
            <option key={Math.random()} value={number}>
              {number}
            </option>
          ))}
        </Select>
      </Quantity>
      <Price>${value ? value : parseInt(price)}</Price>
    </>
  );
}

const Price = styled.p`
  font-weight: lighter;
  font-size: 115%;
`;

const Quantity = styled.p`
  font-weight: bold;
  font-size: 105%;
`;

const Select = styled.select`
  border: 3px double black;
  padding: 0.3rem;
  margin-left: 0.4rem;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`;
export default ProductData;
