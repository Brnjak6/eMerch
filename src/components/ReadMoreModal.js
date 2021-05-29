import React from "react";
import styled from "styled-components";

function ReadMoreModal({ description, closeModal }) {
  return (
    <>
      <Overlay onClick={() => closeModal(false)}></Overlay>

      <Modal>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Details by the owner
        </h2>
        <Pgraph>{description}</Pgraph>
        <Button onClick={() => closeModal(false)}>Close</Button>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 50vw;
  z-index: 900;
  overflow: auto;
  background: ${(props) => props.theme.colors.secondary};
  border: 6px double ${(props) => props.theme.colors.main};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 1200px) {
    width: 70vw;
    height: 70vh;
  }

  @media only screen and (max-width: 800px) {
    width: 90vw;
    height: 90vh;
  }

  @media only screen and (max-width: 490px) {
    width: 100vw;
    height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.main};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.third};
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: 200vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Pgraph = styled.p`
  text-align: center;
  padding: 2rem 3rem;
`;

const Button = styled.button`
  z-index: 51;
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: 5% 10%;
  padding: 0.3rem 0.5rem;
  color: ${(props) => props.theme.colors.main};
  margin: 3rem 0;
  width: fit-content;

  &:hover {
    background: #000 !important;
    color: #fff;
  }

  @media only screen and (min-width: 800px) {
    display: none;
  }
`;

export default ReadMoreModal;
