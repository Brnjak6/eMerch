import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "./Contexts/ProductContext";
import styled from "styled-components";
import { ReactComponent as Dollar } from "../img/dollar.svg";

function EnrichingProduct({ data }) {
  const [isImageError, setIsImageError] = useState(false);
  const [product, setProduct] = useContext(ProductContext);

  let history = useHistory();

  const shopNowHandler = (data) => {
    setProduct(data);
    history.push("/product");
  };

  const imageErrorHandler = () => {
    setIsImageError(true);
  };
  return (
    <Product>
      <ImageBox>
        <Img src={data.image} alt="img" onError={() => imageErrorHandler()} />
        <Title>{isImageError ? "Product is not available" : data.name}</Title>
      </ImageBox>
      <Price>
        <DollarSvg />
        {isImageError ? "/" : data.price}
      </Price>
      <Button onClick={() => (isImageError ? null : shopNowHandler(data.id))}>
        {isImageError ? "Not available" : "Product Details"}
      </Button>
    </Product>
  );
}

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
export default EnrichingProduct;
