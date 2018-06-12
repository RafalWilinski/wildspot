import React from "react";
import styled from "styled-components";
import { Popup } from "react-mapbox-gl";

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const PlaceDetailsPopup = ({ selectedPlace }) => (
  <Popup key={selectedPlace.id} coordinates={selectedPlace.coordinates}>
    <StyledPopup>
      <div>{selectedPlace.id}</div>
    </StyledPopup>
  </Popup>
);

export default PlaceDetailsPopup;
