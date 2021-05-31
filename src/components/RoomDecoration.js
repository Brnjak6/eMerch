import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../components/ProductContext";
import HashLoader from "react-spinners/HashLoader";
import { ReactComponent as Dollar } from "../img/dollar.svg";

function RoomDecoration() {
  const [product, setProduct] = useContext(ProductContext);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);
  const [contents4, setContents4] = useState(null);
  const [contents5, setContents5] = useState(null);
  const [contents6, setContents6] = useState(null);
  let history = useHistory();

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/642136027?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/935071104?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;

  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/949303486?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url3 = `https://api.allorigins.win/get?url=${encoded3}`;

  const encoded4 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/894696520?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url4 = `https://api.allorigins.win/get?url=${encoded4}`;

  const encoded5 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/618214338?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url5 = `https://api.allorigins.win/get?url=${encoded5}`;

  const encoded6 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/880690644?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url6 = `https://api.allorigins.win/get?url=${encoded6}`;

  useEffect(() => {
    fetch(url1)
      .then((response) => response.json())
      .then((data) => setContents1(JSON.parse(data.contents).results[0]))
      .catch(console.error);
    fetch(url2)
      .then((response) => response.json())
      .then((data) => setContents2(JSON.parse(data.contents).results[0]))
      .catch(console.error);
    fetch(url3)
      .then((response) => response.json())
      .then((data) => setContents3(JSON.parse(data.contents).results[0]))
      .catch(console.error);
    fetch(url4)
      .then((response) => response.json())
      .then((data) => setContents4(JSON.parse(data.contents).results[0]))
      .catch(console.error);
    fetch(url5)
      .then((response) => response.json())
      .then((data) => setContents5(JSON.parse(data.contents).results[0]))
      .catch(console.error);
    fetch(url6)
      .then((response) => response.json())
      .then((data) => setContents6(JSON.parse(data.contents).results[0]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (
      contents1 &&
      contents2 &&
      contents3 &&
      contents4 &&
      contents5 &&
      contents6
    ) {
      setContentLoaded(true);
    }
  }, [contents1, contents2, contents3, contents4, contents5, contents6]);

  const shopNowHandler = (data) => {
    setProduct(data);
    history.push("/product");
  };

  if (!contentLoaded) {
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
              <Img src={contents1.Images[0].url_fullxfull} alt="img" />
              <Title>Mini Bar</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents1.price}
            </Price>
            <Button onClick={() => shopNowHandler(642136027)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={contents2.Images[0].url_fullxfull} alt="img" />
              <Title>Room Lights</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents2.price}
            </Price>
            <Button onClick={() => shopNowHandler(935071104)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={contents3.Images[0].url_fullxfull} alt="img" />
              <Title>White Soft Carpet</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents3.price}
            </Price>
            <Button onClick={() => shopNowHandler(949303486)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={contents4.Images[0].url_fullxfull} alt="img" />
              <Title>Poufs Square</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents4.price}
            </Price>
            <Button onClick={() => shopNowHandler(973019467)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={contents5.Images[0].url_fullxfull} alt="img" />
              <Title>Mini Table</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents5.price}
            </Price>
            <Button onClick={() => shopNowHandler(618214338)}>
              Product Details
            </Button>
          </Product>
          <Product>
            <ImageBox>
              <Img src={contents6.Images[0].url_fullxfull} alt="img" />
              <Title>Vintage table</Title>
            </ImageBox>
            <Price>
              <DollarSvg />
              {contents6.price}
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
