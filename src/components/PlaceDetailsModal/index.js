/* eslint jsx-a11y/accessible-emoji: 0 */

import React, { Component } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LocationOn from "@material-ui/icons/LocationOn";
import ThumbUp from "@material-ui/icons/ThumbUp";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/icons/Link";
import { IconButton } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import withVoting from "../../enhancers/withVoting";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const Groundwork = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const ThumbsUpCount = styled.div`
  font-size: 10px;
  margin-left: 5px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding-bottom: 0;
`;

const Emoji = styled.span`
  display: block;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
  cursor: zoom-in;
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlaceDetailsModal extends Component {
  state = {
    image: null
  };

  onZoomImage = image => {
    this.setState({ image });
  };

  onZoomClose = () => {
    this.setState({
      image: null
    });
  };

  render() {
    const {
      isOpen,
      classes,
      fullScreen,
      selectedPlace,
      onClose,
      onChangeNotificationText
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <Helmet>
          <title>{isOpen ? selectedPlace.entity.name : "Wildspot"}</title>
          <meta
            name="description"
            content={`Description of ${selectedPlace.entity.name}: ${
              selectedPlace.entity.description
            }`}
          />
        </Helmet>

        {fullScreen && (
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        )}
        <StyledDialogTitle id="form-dialog-title">
          {selectedPlace.entity.name}
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

          <Emoji disabled={!selectedPlace.entity.features.wifi}>📡 WiFi</Emoji>
          <Emoji disabled={!selectedPlace.entity.features.ac}>
            🔌 A/C Power Access
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.grocery}>
            🛒 Grocery Nearby
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.water}>
            🚰 Water Access
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.cellular}>
            📶 Cellular Access
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.car}>
            🚗 Accessible by car
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.food}>
            🍽 Food nearby
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.gasStation}>
            ⛽️ Gas Station nearby
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.beach}>
            🏖 Beach Access
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.notCrowded}>
            👨‍👩‍👧‍👦 Not Crowded
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.quiet}>
            🤫 Quiet
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.campingAllowed}>
            🏕 Camping Allowed
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.pets}>
            🐯 Animals Nearby
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.wc}>
            🚽 WC Nearby
          </Emoji>
          <GridList
            cellHeight={160}
            className={classes.gridList}
            cols={3}
            style={{ marginTop: "10px" }}
          >
            {(selectedPlace.entity.images || []).filter(Boolean).map(img => (
              <GridListTile key={img} cols={1}>
                <Image
                  src={img}
                  alt={selectedPlace.entity.name}
                  onClick={() => this.onZoomImage(img)}
                />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
        <DialogActions>
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
          <IconButton onClick={this.props.onVote}>
            <ThumbUp color={this.props.isVoted ? "primary" : "disabled"} />
            <ThumbsUpCount>{selectedPlace.votesCount || 0}</ThumbsUpCount>
          </IconButton>
        </DialogActions>
        <Dialog
          onClose={this.onZoomClose}
          fullScreen
          open={this.state.image}
          TransitionComponent={Transition}
        >
          <img
            style={{ width: "100%" }}
            onClick={this.onZoomClose}
            src={this.state.image}
          />
        </Dialog>
      </Dialog>
    );
  }
}

export default withMobileDialog()(
  withStyles(styles)(withVoting(PlaceDetailsModal))
);
