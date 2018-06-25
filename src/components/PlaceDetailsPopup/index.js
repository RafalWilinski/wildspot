import React from "react";
import styled from "styled-components";
import { Popup } from "react-mapbox-gl";

import ThumbUp from "@material-ui/icons/ThumbUp";

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

const Image = styled.img`
  height: 140px;
`;

class PlaceDetailsPopup extends React.Component {
  render() {
    const { selectedPlace } = this.props;

    return (
      <Popup
        key={selectedPlace.id}
        coordinates={selectedPlace.entity.coordinates}
        offset={{
          bottom: [0, -25]
        }}
      >
        <StyledPopup
          onClick={() => {
            window.history.pushState(
              { pageTitle: selectedPlace.entity.name },
              "",
              `/${selectedPlace.id}`
            );

            this.props.onPlaceDetailsModalOpen();
          }}
        >
          <Row>
            <Title>{selectedPlace.entity.name}</Title>
            <ThumbUp
              style={{
                fontSize: 16,
                marginLeft: "25px",
                marginRight: "5px",
                marginTop: "2px"
              }}
            />
            <div>{selectedPlace.votesCount || 0}</div>
          </Row>
          <Row>
            {selectedPlace.entity.features.quiet && "🤫"}
            {selectedPlace.entity.features.wifi && "📡"}
            {selectedPlace.entity.features.gasStation && "⛽️"}
            {selectedPlace.entity.features.wc && "🚽"}
            {selectedPlace.entity.features.cellular && "📶"}
            {selectedPlace.entity.features.campingAllowed && "⛺️"}
            {selectedPlace.entity.features.car && "🚙"}
            {selectedPlace.entity.features.ac && "🔌"}
            {selectedPlace.entity.features.beach && "🏖"}
            {selectedPlace.entity.features.pets && "🐱"}
            {selectedPlace.entity.features.water && "🍸"}
            {selectedPlace.entity.features.food && "🍽"}
            {selectedPlace.entity.features.notCrowded && "👨‍👨‍👧‍👧"}
            {selectedPlace.entity.features.grocery && "🛒"}
          </Row>
          {selectedPlace.entity.images &&
            selectedPlace.entity.images.length > 0 && (
              <Row>
                <Image src={selectedPlace.entity.images[0]} />
              </Row>
            )}
        </StyledPopup>
      </Popup>
    );
  }
}

export default PlaceDetailsPopup;
