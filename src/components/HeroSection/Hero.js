import React from "react";
import styled from "styled-components";
import Products from "./Products";
import Recommended from "./Recommended";
import { motion } from "framer-motion";
import { pageAnimation } from "../../global/Animations";

function Hero() {
  return (
    <Container variants={pageAnimation} initial="hidden" animate="show">
      <Recommended />
      <Products />
    </Container>
  );
}

const Container = styled(motion.div)`
  min-height: 85vh;
  display: flex;
  flex-direction: column;
`;

// Design recreated

export default Hero;
