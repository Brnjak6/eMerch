import React from "react";
import { ReactComponent as Arrow } from "../img/down-arrow.svg";
import styled from "styled-components";

function DiscoverComponent() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: ".4rem" }}>
      DISCOVER <ArrowBtn />
    </div>
  );
}
const ArrowBtn = styled(Arrow)`
  fill: ${(props) => props.theme.colors.secondary};
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
  padding-bottom: 0.3rem;
`;
export default DiscoverComponent;
