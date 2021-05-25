import React from "react";
import styled from "styled-components";

function ReadMoreModal({ description, closeModal }) {
  return (
    <>
      <Overlay onClick={() => closeModal(false)} />

      <Modal>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Details by the owner
        </h2>
        <Pgraph>{description}</Pgraph>
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
  height: 100%;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pgraph = styled.p`
  text-align: center;
  padding: 2rem 3rem;
`;

export default ReadMoreModal;
