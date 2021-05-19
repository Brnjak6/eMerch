import React, { useState, useContext } from "react";
import { InputSearchContext } from "../components/InputSearchContext";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import Background from "../img/Background.jpg";

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
            <Front>
              <Title>
                {res.title.length > 25
                  ? res.title.substring(0, 25) + "..."
                  : res.title}
              </Title>
              <Img src={res.Images[0].url_170x135} alt="img" />
              <Price>${res.price}</Price>
            </Front>
            <Hover>
              <Button>Details</Button>
            </Hover>
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
  background-image: url(${Background});
  background-repeat: repeat;
`;

const Hover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.7s all;
`;

const Button = styled.button`
  transition: 0.3s all;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.main} !important;
  border: 5px double ${(props) => props.theme.colors.main};
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 0%;
`;

const ItemBox = styled.div`
  width: 19rem;
  height: 40vh;
  margin: 0 1.4rem;
  margin-bottom: 6rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.075);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
  border-right: 2px rgba(40, 40, 40, 0.35) solid;

  &:hover {
    ${Hover} {
      opacity: 1;
    }

    ${Img} {
      display: none;
    }
  }
`;

const Price = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0%;
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};
  letter-spacing: 0.3rem;
  padding: 0.3rem;
  width: 100%;
  height: 10%;
  text-align: center;
`;

const Front = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  height: 15%;
  width: 100%;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.main};
  font-weight: lighter;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SearchPage;
