import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

function SelectedProduct() {
  const [product, setProduct] = useState(ProductContext);
  const [fetched, setFetched] = useState(false);
  const [number, setNumber] = useState(false);
  const encodedSearch = encodeURIComponent(
    `https://openapi.etsy.com/v2/listings/${parseInt(product)}?api_key=${
      process.env.REACT_APP_ESHOP_KEY
    }&includes=Images`
  );
  const url = `https://api.allorigins.win/get?url=${encodedSearch}`;

  useEffect(() => {
    console.log(product);
    setNumber(product);
  }, []);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.contents) {
          setFetched(JSON.parse(data.contents));
          console.log(JSON.stringify(encodedSearch));
        }
      })
      .catch(console.error);
    setTimeout(() => {
      console.log(encodedSearch);
    }, 1400);
  }, []);
  return !fetched ? (
    <LoadContainer>
      <HashLoader size={150} />
    </LoadContainer>
  ) : (
    <Container>
      <Image />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 3.5rem;
  background: black;
  height: 75vh;
  width: 50vw;
`;

const Image = styled.img`
  width: 25vw;
  height: 60vh;
`;

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SelectedProduct;
