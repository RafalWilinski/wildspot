import React from "react";
import styled from "styled-components";

const Cover = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 40vh;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 3em;
  color: white;
`;

const Cov = ({ text, onClick }) => <Cover onClick={onClick}>{text}</Cover>;

export default Cov;
