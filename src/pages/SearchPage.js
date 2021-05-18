import React, { useState, useContext } from "react";
import { InputSearchContext } from "../components/InputSearchContext";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

function SearchPage() {
  const [inputData, setInputData] = useContext(InputSearchContext);

  return !inputData ? (
    <LoadContainer>
      <HashLoader size={200} />
    </LoadContainer>
  ) : (
    <ResultsContainer>
      {inputData?.results.map((res) => {
        return (
          <ItemBox key={res.listing_id}>
            <ImgBox>
              <Img src={res.Images[0].url_170x135} alt="img" />
              <Price>${res.price}</Price>
              <BorderBottom />
              <BorderTop />
            </ImgBox>

            <p>{res.title}</p>
          </ItemBox>
        );
      })}
    </ResultsContainer>
  );
}

const LoadContainer = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  padding-top: 4rem;
  justify-content: center;
`;

const ItemBox = styled.div`
  width: 20rem;
  height: 30vh;
  margin: 0 1.4rem;
  margin-bottom: 6rem;
  padding: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  background: ${(props) => props.theme.colors.main};
  height: 65%;
  width: 80%;
  position: relative;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  background: ${(props) => props.theme.colors.third};
  color: ${(props) => props.theme.colors.main};
  padding: 0.3rem;
`;

const BorderBottom = styled.div`
  position: absolute;
  top: 0%;
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, #70d0ef 50%, #fff);
`;

const BorderTop = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 10px;
  background: linear-gradient(to left, #70d0ef 50%, #fff);
`;
export default SearchPage;
