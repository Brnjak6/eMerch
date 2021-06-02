import React from "react";
import styled from "styled-components";

function AlertWindow(props) {
  return (
    <Container onClick={() => props.closeAlertMessage()}>
      <Message>
        <h1>{props.message}</h1>
      </Message>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 500;
  top: 0%;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const Message = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px double ${(props) => props.theme.colors.main};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.main};

  @media only screen and (max-width: 700px) {
    width: 100%;
    height: 50%;
  }
`;

export default AlertWindow;
