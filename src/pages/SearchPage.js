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
          <ItemBox>
            <Item key={res.id}>
              <Img src={res.Images[0].url_fullxfull} alt="img" />
              <div>
                <p>{res.title}</p>
              </div>
            </Item>
            <p>{res.price}</p>
          </ItemBox>
        );
      })}
    </ResultsContainer>
  );
}

const LoadContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: red;
`;

const ItemBox = styled.div`
  width: 6rem;
  height: 8rem;
  position: relative;
`;

const Item = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;
export default SearchPage;
