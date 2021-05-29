import React from "react";
import styled from "styled-components";
import { ReactComponent as Flying } from "../img/flying.svg";

function Intro() {
  return (
    <Container>
      <h1>Our Versatility Towards Yours Desirability Is Incomperable</h1>
      <br />
      <Title>Widicy</Title>
      <LogoSvg />
      <h1 style={{ textAlign: "center" }}>
        Everything You Need <br /> <br /> In One Place
      </h1>
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
  margin: 4rem 0;
  color: ${(props) => props.theme.colors.main};
  letter-spacing: 0.4rem;
  font-family: "Rhodium Libre", serif;
`;

const LogoSvg = styled(Flying)`
  width: 5rem;
  height: 5rem;
  margin-bottom: 5rem;
  animation-name: flicker;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes flicker {
    0% {
      fill: ${(props) => props.theme.colors.main};
    }
    10% {
      fill: ${(props) => props.theme.colors.third};
    }
    14% {
      fill: ${(props) => props.theme.colors.main};
    }
    24% {
      fill: ${(props) => props.theme.colors.third};
    }
    34% {
      fill: ${(props) => props.theme.colors.main};
    }
    44% {
      fill: ${(props) => props.theme.colors.third};
    }
    100% {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`;
export default Intro;
