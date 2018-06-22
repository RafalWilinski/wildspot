import styled from "styled-components";

export default styled.div`
  position: absolute;
  display: flex;
  flex-direction: ${props =>
    props.orientation === "horizontal" ? "row" : "column"};
  left: 20px;
  right: 20px;
  bottom: 20px;
  flex-flow: ${props => props.flexFlow};
`;
