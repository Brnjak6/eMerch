import React from "react";
import Header from "../components/Header";
import styled from "styled-components";

function Main() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;

export default Main;
