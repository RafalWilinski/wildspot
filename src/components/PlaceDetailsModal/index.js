/* eslint jsx-a11y/accessible-emoji: 0 */

import React, { Component } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet";
import ProgressiveImage from "react-progressive-image";
import { flag } from "country-code-emoji";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import Cloud from "@material-ui/icons/Cloud";
import { IconButton } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import withVoting from "../../enhancers/withVoting";

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

const Details = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 3px;
  margin-top: 3px;
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
  height: 160px;
  cursor: zoom-in;
`;

const PlaceholderLoader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PlaceDetailsModal extends Component {
  state = {
    image: null,
    isWeatherLoading: true,
  };

  componentWillMount() {
    this.props.firebaseRef
      .child(this.props.selectedPlace.id)
      .on("value", snap => {
        this.setState(
          {
            selectedPlace: snap.val(),
          },
          () => {
            fetch(
              `https://us-central1-wildspots-d2aad.cloudfunctions.net/getWeather?lat=${
                this.state.selectedPlace.entity.coordinates[1]
              }&lon=${this.state.selectedPlace.entity.coordinates[0]}`,
            )
              .then(res => res.json())
              .then(weather => {
                this.setState({
                  weather,
                  isWeatherLoading: false,
                });
              });
          },
        );
      });
  }

  onZoomImage = image => {
    this.setState({ image });
  };

  onZoomClose = () => {
    this.setState({
      image: null,
      isWeatherLoading: true,
    });
  };

  getWeatherIcon = weather => {
    switch (weather) {
      case "light intensity shower rain":
      case "shower rain":
        return "🌧";
      case "light rain":
        return "🌦";
      case "few clouds":
        return "🌤";
      case "clear sky":
        return "☀️";
      case "broken clouds":
        return "☁";
      case "scattered clouds":
        return "🌥";
      case "rain":
        return "🌧";
      case "thunderstorm":
        return "⛈";
      case "snow":
        return "🌨";
      case "mist":
        return "🌫";
      default:
        return "🤷‍";
    }
  };

  getWeather = () => {
    const { isWeatherLoading, weather } = this.state;
    if (isWeatherLoading) return <span>⏳</span>;

    return `${this.getWeatherIcon(weather.weather[0].description)} (${(
      weather.main.temp - 273.15
    ).toFixed(1)}°C / ${(((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(
      1,
    )}°F)`;
  };

  render() {
    const {
      isOpen,
      classes,
      fullScreen,
      onClose,
      onChangeNotificationText,
    } = this.props;

    const { selectedPlace } = this.state;

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
          {flag(selectedPlace.entity.countryCode)} {selectedPlace.entity.name}{" "}
          {this.getWeather()}
        </StyledDialogTitle>
        <DialogContent>
          <DialogContentText style={{ whiteSpace: "pre-line" }}>
            {selectedPlace.entity.description}
          </DialogContentText>
          {selectedPlace.entity.groundwork && (
            <Details>
              Groundwork: {selectedPlace.entity.groundwork}
              {selectedPlace.createdAt
                ? `, Added: ${new Date(
                    selectedPlace.createdAt,
                  ).toLocaleDateString()}`
                : ""}
            </Details>
          )}

          <Details>
            GPS: {selectedPlace.entity.coordinates[0]},{" "}
            {selectedPlace.entity.coordinates[1]}
          </Details>

          {!this.state.isWeatherLoading && (
            <Details>Nearest City: {this.state.weather.name}</Details>
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
          <Emoji disabled={!selectedPlace.entity.features.trash}>
            🗑 Trash Nearby
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.cellular}>
            📶 Cellular Access
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.car}>
            🚗 Accessible by car
          </Emoji>
          <Emoji disabled={!selectedPlace.entity.features.bike}>
            🚴‍ Accessible by bike
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
            cols={4}
            style={{ marginTop: "10px" }}
          >
            {(selectedPlace.entity.images || []).filter(Boolean).map(img => (
              <GridListTile key={img} cols={1}>
                <Image
                  src={img.replace("/o/images%2F", "/o/images%2Fthumb_")}
                  alt={selectedPlace.entity.name}
                  onClick={() => this.onZoomImage(img)}
                />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
        <DialogActions>
          {!this.state.isWeatherLoading && (
            <Tooltip id="tooltip-vote" title="Open weather forecast">
              <a
                href={`https://openweathermap.org/city/${
                  this.state.weather.id
                }`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <IconButton className={classes.button}>
                  <Cloud />
                </IconButton>
              </a>
            </Tooltip>
          )}
          <Tooltip id="tooltip-vote" title="Open in Google Maps">
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
          </Tooltip>
          <Tooltip id="tooltip-vote" title="Copy URL to clipboard">
            <CopyToClipboard
              text={window.location}
              onCopy={() => onChangeNotificationText("Link copied!")}
            >
              <IconButton className={classes.button}>
                <Link />
              </IconButton>
            </CopyToClipboard>
          </Tooltip>
          <Tooltip id="tooltip-vote" title="Vote for this place">
            <IconButton onClick={this.props.onVote}>
              <ThumbUp color={this.props.isVoted ? "primary" : "disabled"} />
              <ThumbsUpCount>{selectedPlace.votesCount || 0}</ThumbsUpCount>
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Dialog
          onClose={this.onZoomClose}
          open={this.state.image}
          TransitionComponent={Transition}
        >
          <ProgressiveImage
            src={this.state.image}
            placeholder={
              this.state.image
                ? this.state.image.replace("/o/images%2F", "/o/images%2Fthumb_")
                : ""
            }
          >
            {(src, loading) => (
              <div>
                <img
                  style={{ opacity: loading ? 0.5 : 1, width: "100%" }}
                  src={src}
                  alt={selectedPlace.entity.name}
                />
                {loading && (
                  <PlaceholderLoader>
                    <CircularProgress style={{ color: "#ffffff" }} />
                  </PlaceholderLoader>
                )}
              </div>
            )}
          </ProgressiveImage>
        </Dialog>
      </Dialog>
    );
  }
}

export default withMobileDialog()(
  withStyles(styles)(withVoting(PlaceDetailsModal)),
);
