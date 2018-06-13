import React from "react";
import { Feature, Layer } from "react-mapbox-gl";
import classNames from "classnames";

import firebase from "./firebase";
import Cover from "./components/Cover";
import BottomMenuContainer from "./components/BottomMenuContainer";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import { withStyles } from "@material-ui/core/styles";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";
import Map from "./mapbox";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        {
          id: 1,
          coordinates: [-0.481747846041145, 51.3233379650232],
        },
        {
          id: 2,
          coordinates: [-0.13235092163085938, 51.518250335096376],
        },
      ],
      selectedPlace: {},
      isAdding: false,
      isShowingAddCover: false,
      currentCenter: [-0.481747846041145, 51.3233379650232],
    };
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref("/");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      console.log(snap);
      this.setState({ someData: snap.val() });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off("value", this.firebaseCallback);
  }

  onAddingPlace = () => {
    this.setState({
      isShowingAddCover: true,
      isAdding: false,
    });
  };

  onCloseCover = () => {
    this.setState({
      isShowingAddCover: false,
      isAdding: true,
    });
  };

  onMarkClick = selectedPlace => {
    this.setState({
      selectedPlace,
    });
  };

  onMoveEnd = e => {
    this.setState({
      currentCenter: [e.transform._center.lng, e.transform._center.lat],
    });
  };

  onCancelAdding = () => {
    this.setState({
      isAdding: false,
      isShowingAddCover: false,
    });
  };

  renderCampsites = () => (
    <Layer
      type="symbol"
      layout={{ "icon-image": "campsite-15", "icon-size": 1.5 }}
    >
      {this.state.places.map(place => (
        <Feature
          key={place.id}
          onClick={() => this.onMarkClick(place)}
          coordinates={place.coordinates}
        />
      ))}
    </Layer>
  );

  renderPlaceDetails = () => {
    const { selectedPlace } = this.state;

    return (
      selectedPlace.coordinates && (
        <PlaceDetailsPopup selectedPlace={selectedPlace} />
      )
    );
  };

  renderCover = () =>
    this.state.isShowingAddCover && (
      <Cover
        onClick={this.onCloseCover}
        text="Drag a dot to select exact place"
      />
    );

  renderAddFeature = () =>
    this.state.isAdding && (
      <Layer
        type="circle"
        paint={{
          "circle-radius": 15,
          "circle-color": "#E54E52",
          "circle-opacity": 0.8,
        }}
      >
        <Feature coordinates={this.state.currentCenter} />
      </Layer>
    );

  renderAddButton = () =>
    this.state.isAdding ? (
      <BottomMenuContainer flexFlow="column">
        <Button
          color="primary"
          variant="contained"
          className={this.props.classes.button}
          size="large"
        >
          <Save
            className={classNames(
              this.props.classes.leftIcon,
              this.props.classes.iconSmall,
            )}
          />
          Add Location
        </Button>
        <Button
          variant="contained"
          onClick={this.onCancelAdding}
          className={this.props.classes.button}
          size="large"
        >
          Cancel
        </Button>
      </BottomMenuContainer>
    ) : (
      <BottomMenuContainer flexFlow="row-reverse">
        <Button onClick={this.onAddingPlace} variant="fab" color="primary">
          <AddIcon />
        </Button>
      </BottomMenuContainer>
    );

  render() {
    const { selectedPlace } = this.state;

    return (
      <Map
        style="mapbox://styles/mapbox/outdoors-v9"
        containerStyle={containerStyle}
        onMoveEnd={this.onMoveEnd}
        center={selectedPlace.coordinates}
      >
        {this.renderCampsites()}
        {this.renderPlaceDetails()}
        {this.renderCover()}
        {this.renderAddFeature()}
        {this.renderAddButton()}
      </Map>
    );
  }
}

export default withStyles(styles)(App);
