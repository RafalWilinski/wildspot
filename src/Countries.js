import React from "react";
import styled from "styled-components";
import { normalizeNameToURI } from "./utils";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

const Country = styled.p`
  margin: 5px 0;
`;

export default ({ countries }) => (
  <Container>
    <h1>⛺️ Wildspot Countries List</h1>
    {countries.map(country => (
      <Country>
        <a href={`/${normalizeNameToURI(country.name)}`}>
          Find your next spot for setting up a tent in {country.name}
        </a>
      </Country>
    ))}
  </Container>
);
