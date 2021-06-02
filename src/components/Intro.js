import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../img/logo.svg";

function Intro() {
  return (
    <Container>
      <div style={{ textAlign: "center", lineHeight: "3rem" }}>
        Our Versatility Towards Yours Desirability Is Incomperable
      </div>
      <br />
      <LogoSvg />
      <div style={{ textAlign: "center" }}>
        Everything You Need <br /> <br /> In One Place
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 60vh;
  margin: 10rem 0;
  font-size: 1.9rem;
  letter-spacing: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Rhodium Libre", serif;
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};

  @media only screen and (max-width: 450px) {
    font-size: 1.4rem;
  }
`;

const LogoSvg = styled(Logo)`
  width: 5rem;
  height: 5rem;
  margin: 5rem;
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
