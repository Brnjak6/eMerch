import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import CartInfo from "../components/CartInfo";
import Line from "../components/RadialLine";
import { ItemsInCartContext } from "../components/Contexts/ItemsInCartContext";
import ProductData from "../components/ProductData";
import { ReactComponent as Remove } from "../img/delete.svg";
import { ReactComponent as Basket } from "../img/shopping-basket.svg";
import { ReactComponent as Sad } from "../img/sad.svg";
import { motion } from "framer-motion";
import { pageAnimation } from "../global/Animations";

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

  if (itemsInCart.length === 0) {
    return (
      <EmptyContainer>
        <Header>
          <h1>Your</h1> <br />
          <BasketSvg /> <br />
          <h1>Is Empty</h1> <br />
          <SadSvg /> <br />
        </Header>
        <SecondHeader>
          <h1>...For Now</h1>
        </SecondHeader>
      </EmptyContainer>
    );
  }

  return (
    <Container variants={pageAnimation} initial="hidden" animate="show">
      <GridLeft>
        <SelectedItems>
          <CartTitle>Products in cart</CartTitle>
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

const Container = styled(motion.div)`
  display: grid;
  background: ${(props) => props.theme.colors.secondary};
  grid-template-columns:
    [left-start] minmax(40rem, 70rem) [left-end right-start] minmax(20rem, 1fr)
    [right-end];

  @media only screen and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.colors.secondary};
  }
`;

const GridLeft = styled.div`
  height: 85vh;
  grid-column: left-start / left-end;
  position: relative;
`;

const GridRight = styled.div`
  height: 91vh;
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

  @media only screen and (max-width: 1000px) {
    width: 100vw;
  }
`;

const Products = styled.div`
  width: 80%;
  margin-top: 2rem;
  overflow: auto;
  height: 70vh;
  padding: 1rem;

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

  @media only screen and (max-width: 1100px) {
    margin-bottom: 3rem;
    width: 100%;
    height: 60vh;
  }
`;

const Img = styled.img`
  height: 19vh;
  width: 16vw;
  border: 9px double ${(props) => props.theme.colors.main};
  display: flex;
  align-self: center;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    display: flex;
    align-self: center;
    justify-content: center;
    width: 50%;
    margin-bottom: 1rem;
    border: none;
  }
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`;

const Product = styled.div`
  display: flex;
  margin: 2rem 0;
  padding: 2rem;
  position: relative;
  border: 1px solid black;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    border: none;
    font-size: 120%;
  }
`;

const Title = styled.div`
  font-size: 1.3rem;

  display: flex;
  flex-wrap: wrap;
  text-align: center;

  @media only screen and (max-width: 1200px) {
    font-size: 125%;
  }
  @media only screen and (max-width: 500px) {
    display: none;
  }
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

const BasketSvg = styled(Basket)`
  width: 5rem;
  height: 5rem;
`;

const SadSvg = styled(Sad)`
  width: 5rem;
  height: 5rem;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin-left: 1rem;

  @media only screen and (max-width: 800px) {
    margin-left: 0rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 120%;
  }
`;

const Numbers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 85%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    line-height: 4rem;
    width: 100%;
  }
`;

const CartTitle = styled.div`
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  text-transform: uppercase;
  padding: 0.5rem;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SecondHeader = styled.div``;

export default Cart;
