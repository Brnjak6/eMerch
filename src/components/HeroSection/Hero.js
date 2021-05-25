import React from "react";
import styled from "styled-components";
import Products from "./Products";
import Recommended from "./Recommended";

function Hero() {
  return (
    <Container>
      <GridLeft>
        <Recommended />
      </GridLeft>
      <GridRight>
        <Products />
      </GridRight>
    </Container>
  );
}

const Container = styled.div`
  height: 85vh;
  display: grid;
  grid-template-columns:
    [left-start] minmax(30rem, 70rem) [left-end right-start] minmax(30rem, 1fr)
    [right-end];
`;

const GridLeft = styled.div`
  height: 85vh;
  background: #000;
  grid-column: left-start / left-end;
  position: relative;
  box-shadow: 0 0 20px 1px black;
`;

const GridRight = styled.div`
  height: 85vh;
  grid-column: right-start / right-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Hero;
