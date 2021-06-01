import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../components/ProductContext";
import HashLoader from "react-spinners/HashLoader";
import { ReactComponent as Dollar } from "../img/dollar.svg";
import { enrichingSet } from "./Data";

function RoomDecoration() {
  const [product, setProduct] = useContext(ProductContext);
  let history = useHistory();

  const shopNowHandler = (data) => {
    setProduct(data);
    history.push("/product");
  };

  if (!enrichingSet) {
    return (
      <LoadContainer>
        <HashLoader size={150} color={"#70D0EF"} />
      </LoadContainer>
    );
  } else {
    return (
      <>
        <TitleBox>
          <MainTitle>Room Enriching Set Of Products</MainTitle>
        </TitleBox>
        <Container>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[0].image} alt="img" />
              <Title>Mini Bar</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[0].price}
            </Price>
            <Button onClick={() => shopNowHandler(642136027)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[1].image} alt="img" />
              <Title>Room Lights</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[1].price}
            </Price>
            <Button onClick={() => shopNowHandler(935071104)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[2].image} alt="img" />
              <Title>White Soft Carpet</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[2].price}
            </Price>
            <Button onClick={() => shopNowHandler(949303486)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[3].image} alt="img" />
              <Title>Poufs Square</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[3].price}
            </Price>
            <Button onClick={() => shopNowHandler(894696520)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[4].image} alt="img" />
              <Title>Mini Table</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[4].price}
            </Price>
            <Button onClick={() => shopNowHandler(618214338)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={enrichingSet[5].image} alt="img" />
              <Title>Vintage table</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {enrichingSet[5].price}
            </Price>
            <Button onClick={() => shopNowHandler(880690644)}>
              Product Details
            </Button>
          </Product>
        </Container>
      </>
    );
  }
}
const TitleBox = styled.div`
  width: 100%;
  margin: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainTitle = styled.h1`
  letter-spacing: 0.1rem;
  font-weight: lighter;
  background: ${(props) => props.theme.colors.third};
  width: fit-content;
  color: ${(props) => props.theme.colors.secondary};
  padding: 1rem 3rem;
  font-family: "Rhodium Libre", serif;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  grid-gap: 8rem;
  padding: 0 5rem;
  margin: 10rem 0;

  @media only screen and (max-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(17rem, 20rem));
    grid-gap: 4rem;
    justify-content: center;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 20rem));
    grid-gap: 2rem;
    justify-content: center;
  }
`;

const Product = styled.div`
  width: 100%;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1rem;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  position: absolute;
  width: 50%;
  height: 2rem;
  bottom: -5%;
  background: ${(props) => props.theme.colors.third};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
`;

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  font-size: 1.2rem;
`;

const DollarSvg = styled(Dollar)`
  width: 1.4rem;
  height: 1.4rem;
  fill: #2e3a56;
  margin-right: 1rem;
`;

const Button = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  outline: none;
  background: ${(props) => props.theme.colors.third};
  padding: 0.4rem 0.9rem;
  font-weight: lighter;
  margin-top: 4rem;
  font-size: 1.1rem;
  width: 100%;
  text-align: center;
  transition: 0.2s;

  &:hover {
    background: #275167;
  }

  &:active {
    transform: translateY(3px);
  }
`;

export default RoomDecoration;
