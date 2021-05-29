import React from "react";
import styled from "styled-components";
import Products from "./Products";
import Recommended from "./Recommended";
import { motion } from "framer-motion";
import { slideAnimation } from "../../global/Animations";

function Hero() {
  return (
    <Container variants={slideAnimation} initial="hidden" animate="show">
      <GridLeft>
        <Recommended />
      </GridLeft>
      <GridRight>
        <Products />
      </GridRight>
    </Container>
  );
}

const Container = styled(motion.div)`
  min-height: 85vh;
  display: grid;
  grid-template-columns:
    [left-start] minmax(30rem, 70rem) [left-end right-start] minmax(30rem, 1fr)
    [right-end];

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

const GridLeft = styled.div`
  height: 70vh;
  background: #000;
  grid-column: left-start / left-end;
  position: relative;
  box-shadow: 0 0 5px #000;
`;

const GridRight = styled.div`
  height: 85vh;
  grid-column: right-start / right-end;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    height: auto;
  }
`;

export default Hero;
