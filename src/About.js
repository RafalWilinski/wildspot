import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

export default () => (
  <Container>
    <h1>
      <span role="img" aria-label="icon">
        ⛺️{" "}
      </span>Wildspot
    </h1>
    <h4>Find your next sweet spot for setting up a tent</h4>
    <p>
      This project is brought to you by{" "}
      <a href="https://rwilinski.me">Rafal Wilinski</a>. Wildspot is 100% open
      source, you can check it's code
      <a href="https://github.com/RafalWilinski/wildspot"> here.</a>
    </p>
  </Container>
);
