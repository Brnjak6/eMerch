import React from "react";
import styled from "styled-components";
import { ReactComponent as Flying } from "../img/flying.svg";

function Intro() {
  return (
    <Container>
      <h1>Our versatility towards yours desirability is incomperable</h1>
      <br />
      <Title>Widicy</Title>
      <LogoSvg />
      <h1>Everything you need</h1>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 60vh;
  margin: 10rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 500%;
  margin: 5rem 0;
  color: ${(props) => props.theme.colors.main};
  letter-spacing: 0.4rem;
`;

const LogoSvg = styled(Flying)`
  width: 8rem;
  height: 8rem;
  margin-bottom: 5rem;
  animation-name: flicker;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes flicker {
    0% {
      fill: ${(props) => props.theme.colors.main};
    }
    10% {
      fill: cyan;
    }
    14% {
      fill: ${(props) => props.theme.colors.main};
    }
    24% {
      fill: cyan;
    }
    34% {
      fill: ${(props) => props.theme.colors.main};
    }
    44% {
      fill: cyan;
    }
    100% {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`;
export default Intro;
