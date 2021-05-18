import React, { useState } from "react";
import styled from "styled-components";
function Banner() {
  const [removeBtn, setRemoveBtn] = useState(false);

  const removeBtnHandler = () => {
    setRemoveBtn(true);
  };

  return (
    <Container style={removeBtn ? { display: "none" } : {}}>
      <Button onClick={removeBtnHandler}>x</Button>
      <p>
        Free shipping on all orders <Line>/</Line> This weekend only{" "}
        <Line>/</Line>
      </p>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 4vh;
  background: ${(props) => props.theme.colors.navigation};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  font-size: 0.9rem;
  top: 0%;
`;

const Button = styled.div`
  position: absolute;
  top: 13%;
  right: 1.1%;
  cursor: pointer;
`;

const Line = styled.span`
  color: ${(props) => props.theme.colors.third};
`;

export default Banner;
