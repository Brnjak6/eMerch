import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <Intro>
        <TitleContainer>
          <TitleBox>
            <Background>
              <Title>Widicy</Title>
            </Background>
          </TitleBox>
          <h4>Because you deserve it</h4>
        </TitleContainer>
      </Intro>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Intro = styled.div`
  height: 15rem;
  background: ${(props) => props.theme.colors.navigation};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  position: relative;
  z-index: 1;
  font-size: 2rem;
  font-family: "Inconsolata", sans-serif;
  height: 6rem;
  width: 22vw;
  background: ${(props) => props.theme.colors.secondary};
`;

const Title = styled.h1`
  z-index: 5;
  width: fit-content;
  color: ${(props) => props.theme.colors.secondary};
`;
const Background = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 20%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.colors.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  background: pink;
  height: 10rem;
`;
export default Header;
