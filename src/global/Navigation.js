import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../img/search.svg";
import { ReactComponent as Cart } from "../img/shopping-cart.svg";
import { ReactComponent as Arrow } from "../img/down-arrow.svg";

function Navigation() {
  const [fixedNav, setfixedNav] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 130) {
        setfixedNav(true);
      } else {
        setfixedNav(false);
      }
    };

    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [window.scrollY]);

  return (
    <Container
      style={fixedNav ? { position: "fixed", opacity: 0.8, top: 0 } : null}
    >
      <SearchBox>
        <SearchBtn />
        <Input type="search" placeholder="Search items......" />
      </SearchBox>
      <Title>Widicy</Title>
      <RightItems>
        <ProductsBox>
          <Products>Products</Products>
          <ArrowBtn />
        </ProductsBox>
        <CartIcon />
      </RightItems>
      <BorderBottom></BorderBottom>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 11vh;
  padding: 0 5rem;
  background: ${(props) => props.theme.colors.navigation};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.colors.third};
  font-family: "Rhodium Libre", serif;
`;

const RightItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartIcon = styled(Cart)`
  fill: white;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
`;

const ArrowBtn = styled(Arrow)`
  fill: white;
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const SearchBtn = styled(Search)`
  width: 1.2rem;
  height: 1.2rem;
  fill: ${(props) => props.theme.colors.secondary};
  position: absolute;
  top: 30%;
  opacity: 0.8;
  right: 13%;
  cursor: pointer;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  letter-spacing: 0.25rem;
  font-family: "Rhodium Libre", serif;
`;

const ProductsBox = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5vw;
`;

const Products = styled.div`
  font-size: 1.3rem;
  letter-spacing: 0.3rem;
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0%;
  right: 45%;
  height: 0.2rem;
  width: 10%;
  background: ${(props) => props.theme.colors.third};
  box-shadow: 0 -2px 20px 4px ${(props) => props.theme.colors.third};
`;

const SearchBox = styled.div`
  width: 11%;
  height: 6vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;

  &:before {
    content: "";
    width: 100%;
    height: 3px;
    top: 0%;
    left: -80%;
    background: linear-gradient(to right, transparent 30%, #fff);
    position: absolute;
  }

  &:after {
    content: "";
    width: 100%;
    height: 3px;
    background: ${(props) => props.theme.colors.third};
    position: absolute;
    bottom: 0%;
    left: 30%;
    background: linear-gradient(to left, transparent 30%, #fff);
  }
`;

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  caret-color: ${(props) => props.theme.colors.third};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 5%;
  height: 60%;
  font-size: 1.15rem;
  font-weight: lighter;
  padding: 0.5rem 1rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.secondary};
    font-family: "Rhodium Libre", serif;
    font-size: 1rem;
    opacity: 0.4;
  }
`;

export default Navigation;
