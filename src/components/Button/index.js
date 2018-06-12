import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 12px;
  border-radius: 10px;
  color: white;
  background-color: ${props => (props.primary ? "#ff710c" : "")};
  padding: 10px;

  position: ${props => (props.confirm ? "absolute" : "initial")}
  left: ${props => (props.confirm ? "10px" : undefined)}
  right: ${props => (props.confirm ? "10px" : undefined)}
  bottom: ${props =>
    props.confirm
      ? `calc(40px + ${props.extraBottomSpace || "0px"});`
      : undefined}
  width: ${props => (props.confirm ? "calc(100% - 20px)" : undefined)}
`;

const Btn = ({ text, onClick, ...props }) => (
  <Button {...props} onClick={onClick}>
    {text}
  </Button>
);

export default Btn;
