import React from "react";
import styled from "styled-components";
import cityview from "../img/cityview.jpg";
import fashion1 from "../img/fashion/fashion1.jpg";
import fashion2 from "../img/fashion/fashion2.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageAnimation } from "../global/Animations";
import { useScroll } from "../global/useScroll";

function CityView() {
  const [element, controls] = useScroll();
  return (
    <Container
      variants={pageAnimation}
      initial="hidden"
      animate={controls}
      ref={element}
    >
      <Image1 src={fashion1} alt="fashionImage" />
      <Image2 src={fashion2} alt="fashionImage" />
      <Information>
        <Text>
          Editor's Choice <br />
          <span style={{ fontSize: "50%" }}>Fashion For Men & Women</span>
        </Text>
        <GoToFashion to="/fashion">
          <Button>Discover</Button>
        </GoToFashion>
      </Information>
    </Container>
  );
}

const Container = styled(motion.div)`
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

const Image1 = styled.img`
  object-fit: cover;
  width: 42%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(2%, -50%);

  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

const Image2 = styled.img`
  object-fit: cover;
  width: 25%;
  height: 40%;
  position: absolute;
  top: 60%;
  left: 40%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

const Button = styled.button`
  z-index: 51;
  border: 9px double ${(props) => props.theme.colors.secondary};
  background: transparent;
  border-radius: 5% 15%;
  padding: 0.2rem 1.1rem;
  color: ${(props) => props.theme.colors.secondary};
  margin: 3rem 0;
  width: fit-content;
  align-self: center;
  font-family: "Rhodium Libre", serif;
  font-size: 130%;

  &:hover {
    border: 9px double ${(props) => props.theme.colors.third};
    background: transparent !important;
    color: ${(props) => props.theme.colors.third};
  }
`;

const Information = styled.div`
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: 550px) {
    left: 50%;
    width: 80%;
    font-size: 0.7rem;
  }
`;

const GoToFashion = styled(Link)`
  width: fit-content;
  height: fit-content;
`;

const Text = styled.div`
  text-align: center;
  font-size: 270%;
  letter-spacing: 0.3rem;
  color: ${(props) => props.theme.colors.secondary};
  font-family: "Rhodium Libre", serif;
`;

export default CityView;
