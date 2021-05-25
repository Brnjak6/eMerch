import React from "react";
import styled from "styled-components";
import cityview from "../img/cityview.jpg";

function CityView() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 10rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-image: url(${cityview}),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  background-blend-mode: overlay;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
  width: 100%;
  height: 100%;
`;

export default CityView;
