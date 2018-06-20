import React, { Component } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SignalWifiOff from "@material-ui/icons/SignalWifiOff";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SignalWifi3Bar from "@material-ui/icons/SignalWifi3Bar";
import BatteryCharging90 from "@material-ui/icons/BatteryCharging90";
import BatteryAlert from "@material-ui/icons/BatteryAlert";
import LocalGroceryStore from "@material-ui/icons/LocalGroceryStore";
import LocalDrink from "@material-ui/icons/LocalDrink";
import SignalCellular4Bar from "@material-ui/icons/SignalCellular4Bar";
import SignalCellularOff from "@material-ui/icons/SignalCellularOff";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import LocalDining from "@material-ui/icons/LocalDining";
import LocalGasStation from "@material-ui/icons/LocalGasStation";
import BeachAccess from "@material-ui/icons/BeachAccess";
import Group from "@material-ui/icons/Group";
import NotificationsActive from "@material-ui/icons/NotificationsActive";
import NotificationsOff from "@material-ui/icons/NotificationsOff";
import Home from "@material-ui/icons/Home";
import Pets from "@material-ui/icons/Pets";
import Wc from "@material-ui/icons/Wc";
import LocationOn from "@material-ui/icons/LocationOn";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Link from "@material-ui/icons/Link";
import { IconButton } from "@material-ui/core";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const Groundwork = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const Right = styled.div`
  float: right;
  margin-top: -20px;
`;

const ThumbsUpCount = styled.div`
  font-size: 10px;
  margin-left: 5px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding-bottom: 0;
`;

class PlaceDetailsModal extends Component {
  render() {
    const {
      isOpen,
      classes,
      selectedPlace,
      onClose,
      onChangeNotificationText,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <StyledDialogTitle id="form-dialog-title">
          {selectedPlace.entity.name}
          <Right>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${
                selectedPlace.entity.coordinates[1]
              },${selectedPlace.entity.coordinates[0]}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <IconButton className={classes.button}>
                <LocationOn />
              </IconButton>
            </a>
            <CopyToClipboard
              text={window.location}
              onCopy={() => onChangeNotificationText("Link copied!")}
            >
              <IconButton className={classes.button}>
                <Link />
              </IconButton>
            </CopyToClipboard>
            <IconButton>
              <ThumbUp />
              <ThumbsUpCount>{selectedPlace.votes}</ThumbsUpCount>
            </IconButton>
          </Right>
        </StyledDialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedPlace.entity.description}
          </DialogContentText>
          {selectedPlace.entity.groundwork && (
            <Groundwork>
              Groundwork: {selectedPlace.entity.groundwork}
            </Groundwork>
          )}
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.wifi}
                checked={selectedPlace.entity.features.wifi}
                id="features.wifi"
                icon={<SignalWifiOff />}
                checkedIcon={<SignalWifi3Bar />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="WiFi Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.ac}
                checked={selectedPlace.entity.features.ac}
                id="features.ac"
                icon={<BatteryAlert />}
                checkedIcon={<BatteryCharging90 />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="A/C Power Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.grocery}
                checked={selectedPlace.entity.features.grocery}
                id="features.grocery"
                icon={<LocalGroceryStore />}
                checkedIcon={<LocalGroceryStore />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Grocery Nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.water}
                checked={selectedPlace.entity.features.water}
                id="features.water"
                icon={<LocalDrink />}
                checkedIcon={<LocalDrink />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Water Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.cellular}
                checked={selectedPlace.entity.features.cellular}
                id="features.cellular"
                icon={<SignalCellularOff />}
                checkedIcon={<SignalCellular4Bar />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Cellular Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.car}
                checked={selectedPlace.entity.features.car}
                id="features.car"
                icon={<DirectionsCar />}
                checkedIcon={<DirectionsCar />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Accessible by car"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.food}
                checked={selectedPlace.entity.features.food}
                id="features.food"
                icon={<LocalDining />}
                checkedIcon={<LocalDining />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Food nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.gasStation}
                checked={selectedPlace.entity.features.gasStation}
                id="features.gasStation"
                icon={<LocalGasStation />}
                checkedIcon={<LocalGasStation />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Gas station nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.grocery}
                checked={selectedPlace.entity.features.grocery}
                id="features.beach"
                icon={<BeachAccess />}
                checkedIcon={<BeachAccess />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Beach Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.notCrowded}
                checked={selectedPlace.entity.features.notCrowded}
                id="features.notCrowded"
                icon={<Group />}
                checkedIcon={<Group />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Crowded / Empty"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="features.quiet"
                disabled={!selectedPlace.entity.features.quiet}
                checked={selectedPlace.entity.features.quiet}
                icon={<NotificationsActive />}
                checkedIcon={<NotificationsOff />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Loud / Quiet"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.campingAllowed}
                checked={selectedPlace.entity.features.campingAllowed}
                icon={<Home />}
                id="features.campingAllowed"
                checkedIcon={<Home />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Camping Allowed"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.pets}
                checked={selectedPlace.entity.features.pets}
                icon={<Pets />}
                id="features.pets"
                checkedIcon={<Pets />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="Animals Nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!selectedPlace.entity.features.wc}
                checked={selectedPlace.entity.features.wc}
                id="features.wc"
                icon={<Wc />}
                checkedIcon={<Wc />}
                value="checkedH"
                style={{ height: "32px" }}
              />
            }
            label="WC Nearby"
          />
          <GridList
            cellHeight={160}
            className={classes.gridList}
            cols={3}
            style={{ marginTop: "10px" }}
          >
            {(selectedPlace.entity.images || []).filter(Boolean).map(img => (
              <GridListTile key={img} cols={1}>
                <img src={img} />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PlaceDetailsModal);
