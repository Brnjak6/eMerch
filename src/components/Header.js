import React from "react";
import styled from "styled-components";
import Navigation from "../global/Navigation";
import Banner from "./Banner";
import Hero from "./Hero";

function Header() {
  return (
    <Container>
      <Banner />
      <Navigation />
      <Hero />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

export default Header;
