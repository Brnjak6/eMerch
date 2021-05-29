import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/down-arrow.svg";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../ProductContext";

function Products() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);
  const [product, setProduct] = useContext(ProductContext);
  let history = useHistory();

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/386355698?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/879403626?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;
  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/495036223?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url3 = `https://api.allorigins.win/get?url=${encoded3}`;

  useEffect(() => {
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents1(JSON.parse(data.contents));
        }
      })
      .catch(console.error);

    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents2(JSON.parse(data.contents));
        }
      })
      .catch(console.error);

    fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents3(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  }, []);

  const shopNowHandler = (data) => {
    setProduct(data);
    history.push("/product");
  };

  return (
    <>
      <Title>Trending Products</Title>
      <Container>
        <Product>
          <Img src={contents1?.results[0].Images[0].url_fullxfull} alt="img" />
          <Info>
            <ArrowSvg />
            <Description>Cotton Prairie Pant in OCEAN </Description>
            <Button
              onClick={() => {
                shopNowHandler(386355698);
              }}
            >
              Shop Now
            </Button>
          </Info>
          <MobileButton>Shop Now</MobileButton>
        </Product>
        <Product>
          <Img src={contents2?.results[0].Images[0].url_fullxfull} alt="img" />
          <Info>
            <ArrowSvg />
            <Description>Retro Steampunk Glasses</Description>
            <Button
              onClick={() => {
                shopNowHandler(879403626);
              }}
            >
              Shop Now
            </Button>
          </Info>
          <MobileButton>Shop Now</MobileButton>
        </Product>
        <Product>
          <Img src={contents3?.results[0].Images[0].url_fullxfull} alt="img" />
          <Info>
            <ArrowSvg />
            <Description>
              Floor Lamp - A Beautiful Wooden Floor Lamp
            </Description>
            <Button
              onClick={() => {
                shopNowHandler(495036223);
              }}
            >
              Shop Now
            </Button>
          </Info>
          <MobileButton>Shop Now</MobileButton>
        </Product>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Product = styled.div`
  height: 30%;
  width: 85%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 3px;
  background: #000;

  @media only screen and (max-width: 1200px) {
    width: 20rem;
    height: 20rem;
    margin: 1rem 0;
  }

  @media only screen and (max-width: 800px) {
    height: 60vh;
    width: 80%;
    margin: 1rem 0;
  }

  @media only screen and (max-width: 550px) {
    width: 95%;
    height: 70vh;
  }
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  letter-spacing: 0.3rem;
  font-size: 2rem;
  margin-top: 5rem;
  font-family: "Rhodium Libre", serif;

  @media only screen and (min-width: 1200px) {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media only screen and (max-width: 1200px) {
    height: 85%;
  }
`;

const ArrowSvg = styled(Arrow)`
  position: absolute;
  bottom: 93%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 2rem;
  height: 2rem;
  fill: ${(props) => props.theme.colors.secondary};
  transform: rotate(180deg);

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  background: ${(props) => props.theme.colors.main};
  height: 100%;
  top: 125%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.secondary};
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: 0.6s;
  animation: cubic-bezier(0.06, 0.92, 0.83, 0.67);

  &:hover {
    top: 51%;
    ${ArrowSvg} {
      transform: rotate(360deg);
      transition: 0.3s;
    }
  }
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  margin-bottom: 15%;
  text-align: center;

  @media only screen and (max-width: 1200px) {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  border: 9px double ${(props) => props.theme.colors.secondary};
  background: transparent;
  border-radius: 5% 15%;
  padding: 0.2rem 1.1rem;
  color: ${(props) => props.theme.colors.secondary};
  margin: 2rem 0;
  width: fit-content;
  align-self: center;
  font-family: "Rhodium Libre", serif;
  font-size: 0.9rem;

  &:hover {
    border: 9px double ${(props) => props.theme.colors.third};
    background: transparent !important;
    color: ${(props) => props.theme.colors.third};
  }

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;
const MobileButton = styled.div`
  position: absolute;
  cursor: pointer;
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  outline: none;
  background: ${(props) => props.theme.colors.third};
  font-weight: lighter;
  font-size: 1.3rem;
  width: 100%;
  height: 17%;
  z-index: 200;
  bottom: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Rhodium Libre", serif;

  text-align: center;
  transition: 0.2s;

  &:hover {
    background: #275167;
  }

  &:active {
    transform: translateY(3px);
  }

  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

export default Products;
