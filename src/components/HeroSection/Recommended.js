import React, { useState, useEffect, useContext, useRef } from "react";
import { Fade } from "react-slideshow-image";
import styled from "styled-components";
import "react-slideshow-image/dist/styles.css";
import { ProductContext } from "../ProductContext";
import { InputDataContext } from "../InputDataContext";
import { useHistory } from "react-router-dom";
import { InputContext } from "../InputContext";
import ReactImageAppear from "react-image-appear";

function Recommended() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);
  const [product, setProduct] = useContext(ProductContext);
  const [category, setCategory] = useState(false);
  const [inputData, setInputData] = useContext(InputDataContext);
  const [input, setInput] = useContext(InputContext);

  const notInitialRender = useRef(false);
  let history = useHistory();

  const encodedCategory = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images&keywords=${category}&limit=20`
  );
  const urlCategory = `https://api.allorigins.win/get?url=${encodedCategory}`;

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/465354376?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/685284784?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;
  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/957322104?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
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

  const searchByCategory = (data) => {
    setInputData("");
    setInput(data);
    setCategory(data);
  };

  useEffect(() => {
    if (notInitialRender.current && category) {
      history.push("/search");
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

  const properties = {
    duration: 4000,
    transitionDuration: 500,
  };

  return !contents3 ? (
    <h2>Loading error</h2>
  ) : (
    <div
      style={{
        boxShadow: "0px 4px 10px 0px #000000",
      }}
    >
      <Fade {...properties}>
        <EachSlide>
          <Img src={contents1?.results[0].Images[0].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Bedding items</Description>
            <Button onClick={() => searchByCategory("bedroom")}>
              Shop now
            </Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
        <EachSlide>
          <Img src={contents2?.results[0].Images[0].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Modern Art</Description>
            <Button onClick={() => searchByCategory("modern art")}>
              Shop now
            </Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
        <EachSlide>
          <Img src={contents3?.results[0].Images[0].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Outdoor</Description>
            <Button onClick={() => searchByCategory("outdoor")}>
              Shop now
            </Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
      </Fade>
    </div>
  );
}

const EachSlide = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;

  @media only screen and (max-width: 590px) {
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 50;
  height: 35vh;
  width: 100%;
  z-index: 25;
  color: ${(props) => props.theme.colors.secondary};
  letter-spacing: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: -30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.colors.hsl};
  z-index: 10;
  height: 44vh;
  width: 100%;
  opacity: 0.9;
`;

const Description = styled.h2`
  font-size: 1.8rem;
  font-weight: lighter;
`;

const Button = styled.button`
  z-index: 51;
  border: 9px double ${(props) => props.theme.colors.secondary};
  background: transparent;
  border-radius: 5% 15%;
  padding: 0.2rem 1.1rem;
  color: ${(props) => props.theme.colors.secondary};
  margin: 3rem 0;
  width: fit-content;
  align-self: center;
  font-family: "Rhodium Libre", serif;
  font-size: 130%;

  &:hover {
    border: 9px double ${(props) => props.theme.colors.third};
    background: transparent !important;
    color: ${(props) => props.theme.colors.third};
  }

  @media only screen and (max-width: 590px) {
    margin: 1.8rem;
    font-size: 1rem;
  }
`;

export default Recommended;
