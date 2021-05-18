import React, { useState, useEffect } from "react";
import { Fade } from "react-slideshow-image";
import styled from "styled-components";
import "react-slideshow-image/dist/styles.css";

function Recommended() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);

  const encoded1 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/465354376?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url1 = `https://api.allorigins.win/get?url=${encoded1}`;

  const encoded2 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/958578813?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
  );
  const url2 = `https://api.allorigins.win/get?url=${encoded2}`;
  const encoded3 = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/971993404?api_key=${process.env.REACT_APP_ESHOP_KEY}&includes=Images`
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
    console.log(contents2);

    fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setContents3(JSON.parse(data.contents));
        }
      })
      .catch(console.error);
  }, []);

  const properties = {
    duration: 4000,
    infinite: true,
    transitionDuration: 500,
  };

  return !contents3 ? (
    <h2>Loading error</h2>
  ) : (
    <div>
      <Fade {...properties}>
        <EachSlide>
          <Img src={contents1?.results[0].Images[0].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Bedding items</Description>
            <Button>Shop now</Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
        <EachSlide>
          <Img src={contents2?.results[0].Images[0].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Outdoor items</Description>
            <Button>Shop now</Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
        <EachSlide>
          <Img src={contents3?.results[0].Images[3].url_fullxfull} alt="img" />
          <Overlay />
          <InfoContainer>
            <Description>Wall Objects</Description>
            <Button>Shop now</Button>
            <p>TRENDING THIS WEEK</p>
          </InfoContainer>
        </EachSlide>
      </Fade>
    </div>
  );
}

const EachSlide = styled.div`
  width: 100%;
  height: 85vh;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
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
  overflow: hidden;
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
  padding: 0.4rem 0.9rem;
  border: 8px double ${(props) => props.theme.colors.secondary};
`;

export default Recommended;
