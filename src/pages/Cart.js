import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import CartInfo from "../components/CartInfo";
import Line from "../components/RadialLine";
import { ItemsInCartContext } from "../components/ItemsInCartContext";
import ProductData from "../components/ProductData";
import { ReactComponent as Remove } from "../img/delete.svg";

function Cart() {
  const [itemsInCart, setItemsInCart] = useContext(ItemsInCartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current && itemsInCart.length >= 1) {
      const total = itemsInCart
        .map((item) => {
          return item.value ? parseInt(item.value) : parseInt(item.price);
        })
        .reduce((acc, cur) => {
          return acc + cur;
        });
      setTotalPrice(parseInt(total));
    } else {
      notInitialRender.current = true;
    }
  }, [itemsInCart]);

  const removeItemHandler = (id) => {
    setItemsInCart((prev) => {
      const newItems = prev.filter((item) => item.listing_id !== id);
      return newItems;
    });
  };

  return (
    <Container>
      <GridLeft>
        <SelectedItems>
          <h2>Products in cart</h2>
          <Line />
          <Products>
            {itemsInCart.map((item) => (
              <Product key={item.listing_id}>
                <RemoveSvg onClick={() => removeItemHandler(item.listing_id)} />
                <Img src={item.Images[0].url_170x135} alt="Image" />
                <Information>
                  <Title>{item.title}</Title>
                  <Numbers>
                    <ProductData
                      price={parseInt(item.price)}
                      id={item.listing_id}
                      value={item.value}
                    />
                  </Numbers>
                </Information>
              </Product>
            ))}
          </Products>
        </SelectedItems>
      </GridLeft>
      <GridRight>
        <CartInfo totalPrice={totalPrice} />
      </GridRight>
    </Container>
  );
}

const Container = styled.div`
  height: 85vh;
  display: grid;
  background: white;
  grid-template-columns:
    [left-start] minmax(40rem, 70rem) [left-end right-start] minmax(20rem, 1fr)
    [right-end];
`;

const GridLeft = styled.div`
  height: 85vh;
  grid-column: left-start / left-end;
  position: relative;
`;

const GridRight = styled.div`
  height: 85vh;
  grid-column: right-start / right-end;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SelectedItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 2rem;
`;

const Products = styled.div`
  width: 80%;
  margin-top: 2rem;
  overflow: auto;
  height: 70vh;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.main};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.third};
  }
`;

const Img = styled.img`
  height: 19vh;
  width: 16vw;
  border: 9px double ${(props) => props.theme.colors.main};
`;

const Product = styled.div`
  display: flex;
  margin: 2rem 0;
  background: linear-gradient(120deg, #0af, white);
  padding: 2rem;
  position: relative;
  border: 1px solid black;
`;

const Title = styled.div`
  font-size: 100%;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;

const RemoveSvg = styled(Remove)`
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    fill: ${(props) => props.theme.colors.third};
  }
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30rem;
  margin-left: 1rem;
`;

const Numbers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 85%;
`;

export default Cart;
