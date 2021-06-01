import React from "react";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import { enrichingSet } from "./Data";
import EnrichingProduct from "./EnrichingProduct";

function RoomDecoration() {
  if (!enrichingSet) {
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
          {enrichingSet.map((product) => (
            <EnrichingProduct data={product} key={Math.random()} />
          ))}
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

export default RoomDecoration;
