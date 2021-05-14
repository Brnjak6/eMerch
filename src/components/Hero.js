import React from "react";
import styled from "styled-components";

function Hero() {
  return (
    <Container>
      <Recommended></Recommended>
      <Products>Products</Products>
    </Container>
  );
}

const Container = styled.div`
  height: 84vh;
  background: red;
  display: flex;
`;

const Recommended = styled.div`
  width: 65%;
  height: 84vh;
  background: pink;
`;

const Products = styled.div`
  background: orange;
  height: 814vh;
  width: 35%;
`;

export default Hero;
