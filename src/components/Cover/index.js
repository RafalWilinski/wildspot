import React from "react";
import styled from "styled-components";

const Cover = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 3em;
  color: white;
  z-index: 10000;
`;

const Cov = ({ children, onClick }) => (
  <Cover onClick={onClick}>{children}</Cover>
);

export default Cov;
