import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { OffsetContext } from "./Contexts/OffsetContext";
import { InputContext } from "./Contexts/InputContext";
import { InputDataContext } from "./Contexts/InputDataContext";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { burgerAnimation } from "../global/Animations";
import { ReactComponent as Cart } from "../img/shopping-cart.svg";
import { ItemsInCartContext } from "./Contexts/ItemsInCartContext";

function BurgerMenu({ burgerHandler }) {
  const [category, setCategory] = useState(false);
  const [offset, setOffset] = useContext(OffsetContext);
  const [input, setInput] = useContext(InputContext);
  const [inputData, setInputData] = useContext(InputDataContext);
  const [itemsInCart, setItemsInCart] = useContext(ItemsInCartContext);
  const notInitialRender = useRef(false);
  let history = useHistory();

  const encodedCategory = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${category}&limit=20&offset=${offset}`
  );
  const urlCategory = `https://api.allorigins.win/get?url=${encodedCategory}`;

  const searchByCategory = (data) => {
    setInputData("");
    history.push("/search");
    setInput(data.target.innerHTML);
    setCategory(data.target.innerHTML);

    setTimeout(() => {
      burgerHandler();
    }, 300);
  };

  const redirectToCart = () => {
    burgerHandler();
    history.push("/cart");
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const redirectToHome = () => {
    burgerHandler();
    history.push("/");
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const redirectToEditor = () => {
    burgerHandler();
    history.push("/fashion");
    window.scroll({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (notInitialRender.current && category) {
      fetch(urlCategory)
        .then((response) => response.json())
        .then((data) => {
          if (data.contents) {
            setInputData(JSON.parse(data.contents));
          }
        })
        .catch(console.error);
    } else {
      notInitialRender.current = true;
    }
  }, [category]);
  return (
    <Container variants={burgerAnimation} initial="hidden" animate="show">
      <Ul>
        <ToCart onClick={() => redirectToCart()}>
          <CartBox>
            <CartIcon />
            <CartItems>{itemsInCart.length}</CartItems>
          </CartBox>
        </ToCart>
        <Li onClick={() => redirectToEditor()}>Editor's Choice</Li>
        <Search onClick={(e) => searchByCategory(e)}>Smart Watches</Search>
        <Search onClick={(e) => searchByCategory(e)}>Car Products</Search>
        <Li onClick={() => redirectToHome()}>Home</Li>
      </Ul>
      <Copyright>© Copyright 2021 OPTIC</Copyright>
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 40vw;
  height: 100vh;
  position: fixed;
  z-index: 700;
  right: 0;
  top: 0;
  background: #030303;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  border-left: 2px solid ${(props) => props.theme.colors.third};
  box-shadow: 0 5px 20px #000;

  @media only screen and (max-width: 800px) {
    width: 101vw;
    height: 101vh;
    padding-left: 0.2rem;
  }
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Li = styled.li`
  list-style-type: none;
  margin: 2rem 0;
  font-size: 1.7rem;
  transition: 0.2s;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};

  &:active {
    transform: translateY(4px);
  }

  &:last-child {
    color: ${(props) => props.theme.colors.third};
  }

  @media only screen and (max-width: 450px) {
    font-size: 1.4rem;
  }

  @media only screen and (max-height: 600px) {
    margin: 1.3rem;
  }
`;

const Search = styled.div`
  margin: 2.3rem 0;
  font-size: 1.7rem;
  transition: 0.2s;
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};

  &:active {
    transform: translateY(4px);
  }

  @media only screen and (max-width: 450px) {
    font-size: 1.4rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  justify-self: flex-end;
`;

const CartIcon = styled(Cart)`
  fill: white;
  height: 1.9rem;
  width: 1.9rem;
`;

const CartItems = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;
  position: absolute;
  top: 80%;
  left: 80%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.main};
`;

const CartBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  cursor: pointer;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 450px) {
    margin: 1rem 0;
  }
`;

const ToCart = styled.div`
  width: fit-content;
  height: fit-content;
`;

export default BurgerMenu;
