import React, { useState, useEffect, useContext, useRef } from "react";
import { Fade } from "react-slideshow-image";
import styled from "styled-components";
import "react-slideshow-image/dist/styles.css";
import { InputDataContext } from "../Contexts/InputDataContext";
import { useHistory } from "react-router-dom";
import { InputContext } from "../Contexts/InputContext";
import modernArt from "../../img/modernArt.jpg";
import outdoor from "../../img/outdoor.jpg";
import bedding from "../../img/bedding.jpg";

function Recommended() {
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

  return (
    <div
      style={{
        boxShadow: "0px 4px 10px 0px #000000",
        overflowX: "hidden",
      }}
    >
      <Fade {...properties}>
        <EachSlide>
          <Img src={bedding} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Bedroom Products</Description>
            <Button onClick={() => searchByCategory("bedroom")}>
              Shop now
            </Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
        <EachSlide>
          <Img src={modernArt} alt="img" />
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
          <Img src={outdoor} alt="img" />
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
  height: 92vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: top;
  display: block;

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
  text-transform: uppercase;
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
