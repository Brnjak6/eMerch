import React from "react";
import styled from "styled-components";
import CityView from "../components/CityView";
import Footer from "../components/Footer";
import Hero from "../components/HeroSection/Hero";
import Intro from "../components/Intro";

function Main() {
  return (
    <Container>
      <Hero />
      <Intro />
      <CityView />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 85vh;
`;

export default Main;
