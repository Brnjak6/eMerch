import React from "react";
import styled from "styled-components";
function Footer() {
  return <Container>© Copyright 2021 OPTIC</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 10vh;
  padding: 0 5rem;
  background: ${(props) => props.theme.colors.navigation};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    opacity: 1 !important;
    transition: 0.2s;
  }
`;

export default Footer;
