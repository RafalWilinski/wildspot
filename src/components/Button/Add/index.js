import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 25px;
  right: 25px;
  font-size: 24px;
  border-radius: 50%;
  color: white;
  background-color: #ff710c;
`;

const AddButton = props => <Button onClick={props.onClick}>+</Button>;

export default AddButton;
