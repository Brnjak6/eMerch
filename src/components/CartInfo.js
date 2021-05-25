import React from "react";
import styled from "styled-components";
import "./Wave.scss";

function CartInfo({ totalPrice }) {
  return (
    <Container>
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
        <div className="title">Total</div>
        <Costs>
          <Info>
            <div style={{ marginBottom: "1rem" }}>Costs: ${totalPrice}</div>
            Delivery fee: {totalPrice > 50 ? "/" : "$5"} <br />
            <FreeDelivery>
              {totalPrice > 50
                ? "Eligable for free delivery"
                : `Not eligable for free delivery $${
                    50 - totalPrice
                  } more required for free delivery `}
            </FreeDelivery>
            <Total>
              Total cost: ${totalPrice > 50 ? totalPrice : totalPrice + 5}
            </Total>
            <Button
              style={
                totalPrice >= 0.1
                  ? { opacity: "1" }
                  : { opacity: ".3", border: "2px solid red" }
              }
            >
              Proceed to checkout
            </Button>
          </Info>
        </Costs>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 80%;
  border: 1px solid black;
  border-radius: 2%;
  position: relative;
`;

const Costs = styled.div`
  z-index: 51;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.main};
  font-weight: bolder;
  font-size: 110%;
  letter-spacing: 0.2rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 100%;
  width: 80%;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Total = styled.div`
  margin: 2rem 0;
`;

const Button = styled.button`
  z-index: 51;
  border: none;
  background: cyan !important;
  border-radius: 5% 10%;
  padding: 0.3rem 0.5rem;
  color: ${(props) => props.theme.colors.main};
  margin: 3rem 0;
  width: fit-content;
  align-self: center;

  &:hover {
    background: #000 !important;
    color: #fff;
  }
`;

const FreeDelivery = styled.div`
  font-weight: lighter;
  font-size: 70%;
  width: 80%;
`;

export default CartInfo;
