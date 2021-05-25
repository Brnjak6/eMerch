import React from "react";
import styled from "styled-components";

function RadialLine() {
  return <Line />;
}

const Line = styled.div`
  height: 3px;
  width: 80%;
  background: radial-gradient(#000, #fff);
`;
export default RadialLine;
