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
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  height: 150vh;
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
  border: 6px double ${(props) => props.theme.colors.main};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.main};
`;

export default AlertWindow;
