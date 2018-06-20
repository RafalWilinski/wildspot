import React from "react";
import styled from "styled-components";
import { Popup } from "react-mapbox-gl";

import ThumbUp from "@material-ui/icons/ThumbUp";

import PlaceDetailsModal from "../PlaceDetailsModal";

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

class PlaceDetailsPopup extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    const { selectedPlace, onChangeNotificationText } = this.props;

    return (
      <Popup
        key={selectedPlace.id}
        coordinates={selectedPlace.entity.coordinates}
      >
        <StyledPopup
          onClick={() => {
            window.history.pushState(
              { pageTitle: selectedPlace.entity.name },
              "",
              `/${selectedPlace.id}`,
            );

            this.setState({ isOpen: true });
          }}
        >
          <Row>
            <Title>{selectedPlace.entity.name}</Title>
            <ThumbUp
              style={{
                fontSize: 16,
                marginLeft: "25px",
                marginRight: "5px",
                marginTop: "2px",
              }}
            />
            <div>{selectedPlace.votes}</div>
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

          <PlaceDetailsModal
            onChangeNotificationText={onChangeNotificationText}
            isOpen={this.state.isOpen}
            selectedPlace={selectedPlace}
            onClose={e => {
              this.setState({ isOpen: false });

              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </StyledPopup>
      </Popup>
    );
  }
}

export default PlaceDetailsPopup;
