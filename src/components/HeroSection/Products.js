import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/down-arrow.svg";

function Products() {
  const [contents1, setContents1] = useState(null);
  const [contents2, setContents2] = useState(null);
  const [contents3, setContents3] = useState(null);

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

  return (
    <Container>
      <Product>
        <Img src={contents1?.results[0].Images[0].url_fullxfull} alt="img" />
        <Info>
          <ArrowSvg />
          <Description>Cotton Prairie Pant in OCEAN </Description>
          <button>Shop Now</button>
        </Info>
      </Product>
      <Product>
        <Img src={contents2?.results[0].Images[0].url_fullxfull} alt="img" />
        <Info>
          <ArrowSvg />
          <Description>Retro Steampunk Glasses</Description>
          <button>Shop Now</button>
        </Info>
      </Product>
      <Product>
        <Img src={contents3?.results[0].Images[0].url_fullxfull} alt="img" />
        <Info>
          <ArrowSvg />
          <Description>Floor Lamp - A Beautiful Wooden Floor Lamp</Description>
          <button>Shop Now</button>
        </Info>
      </Product>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Product = styled.div`
  height: 30%;
  width: 85%;
  position: relative;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  transition: all 0.6s;
  animation: cubic-bezier(0.06, 0.92, 0.83, 0.67);

  &:hover {
    top: 50%;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  margin-bottom: 15%;
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
`;

export default Products;
