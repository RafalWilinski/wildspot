import React from "react";
import styled from "styled-components";
import { Popup } from "react-mapbox-gl";

import SignalWifi3Bar from "@material-ui/icons/SignalWifi3Bar";
import BatteryCharging90 from "@material-ui/icons/BatteryCharging90";
import LocalGroceryStore from "@material-ui/icons/LocalGroceryStore";
import LocalDrink from "@material-ui/icons/LocalDrink";
import SignalCellular4Bar from "@material-ui/icons/SignalCellular4Bar";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import LocalDining from "@material-ui/icons/LocalDining";
import LocalGasStation from "@material-ui/icons/LocalGasStation";
import BeachAccess from "@material-ui/icons/BeachAccess";
import Group from "@material-ui/icons/Group";
import NotificationsOff from "@material-ui/icons/NotificationsOff";
import Home from "@material-ui/icons/Home";
import Pets from "@material-ui/icons/Pets";
import Wc from "@material-ui/icons/Wc";
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
`;

const Title = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

class PlaceDetailsPopup extends React.Component {
  state = {
    isOpen: false
  };

  render() {
    const { selectedPlace } = this.props;

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
              `/${selectedPlace.id}`
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
                marginTop: "2px"
              }}
            />
            <div>{selectedPlace.votes}</div>
          </Row>
          <Row>
            {selectedPlace.entity.features.quiet && <NotificationsOff />}
            {selectedPlace.entity.features.wifi && <SignalWifi3Bar />}
            {selectedPlace.entity.features.gasStation && <LocalGasStation />}
            {selectedPlace.entity.features.wc && <Wc />}
            {selectedPlace.entity.features.cellular && <SignalCellular4Bar />}
            {selectedPlace.entity.features.campingAllowed && <Home />}
            {selectedPlace.entity.features.car && <DirectionsCar />}
            {selectedPlace.entity.features.ac && <BatteryCharging90 />}
            {selectedPlace.entity.features.beach && <BeachAccess />}
            {selectedPlace.entity.features.pets && <Pets />}
            {selectedPlace.entity.features.water && <LocalDrink />}
            {selectedPlace.entity.features.food && <LocalDining />}
            {selectedPlace.entity.features.notCrowded && <Group />}
            {selectedPlace.entity.features.grocery && <LocalGroceryStore />}
          </Row>

          <PlaceDetailsModal
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
