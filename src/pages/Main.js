import React from "react";
import styled from "styled-components";
import Hero from "../components/HeroSection/Hero";

function Main() {
  return (
    <Container>
      <Hero />
    </Container>
  );
}

const Container = styled.div`
  min-height: 85vh;
`;

export default Main;
