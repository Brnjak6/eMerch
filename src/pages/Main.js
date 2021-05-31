import React from "react";
import styled from "styled-components";
import CityView from "../components/CityView";
import Footer from "../components/Footer";
import Hero from "../components/HeroSection/Hero";
import Intro from "../components/Intro";
import RoomDecoration from "../components/RoomDecoration";

function Main() {
  return (
    <Container>
      <Hero />
      <Intro />
      <CityView />
      <RoomDecoration />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 85vh;
  background: ${(props) => props.theme.colors.secondary};
  overflow-x: hidden;
`;

export default Main;
