import React from "react";
import { Feature, Layer } from "react-mapbox-gl";
import styled from "styled-components";
import throttle from "lodash.throttle";

import Snackbar from "./components/Snackbar";
import loadingTexts from "./consts/loadingTexts";
import firebase from "./firebase";
import Map from "./mapbox";
import AddPlaceForm from "./components/AddPlaceForm/container";
import AddPlaceMenu from "./components/AddPlaceMenu";
import Cover from "./components/Cover";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";
import Tutorial from "./components/Tutorial";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const CoverText = styled.p`
  line-height: 1.15;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapLoading: true,
      loadingText: "",
      notificationText: "",
      places: [],
      selectedPlace: { entity: {} },
      isAdding: false,
      isFirebaseDataLoading: true,
      isShowingAddCover: false,
      isShowingAddForm: false,
      currentCenter: [-0.2401928739864161, 51.52677435907751],
    };
  }

  componentWillMount() {
    this.loadingTextChangeInterval = setInterval(
      () =>
        this.setState({
          loadingText:
            loadingTexts[Math.floor(Math.random() * loadingTexts.length)],
        }),
      200,
    );
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref("/spots");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      const json = snap.val();

      Object.keys(json).map(key => {
        this.setState({
          places: [...this.state.places, json[key]],
          isFirebaseDataLoading: false,
        });
      });

      if (window.location.pathname) {
        const selectedPlace = this.state.places.filter(
          place => `/${place.id}` === window.location.pathname,
        )[0];

        if (selectedPlace) {
          this.setState({
            selectedPlace,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off("value", this.firebaseCallback);
  }

  onAddingPlace = () => {
    this.setState({
      isShowingAddCover: true,
      selectedPlace: { entity: {} },
      isAdding: false,
    });
  };

  onChangeNotificationText = notificationText => {
    this.setState({
      notificationText,
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

  onConfirmLocation = () => {
    this.setState({
      isShowingAddForm: true,
      isAdding: false,
    });
  };

  onCancelAdding = () => {
    this.setState({
      isAdding: false,
      isShowingAddCover: false,
      isShowingAddForm: false,
    });
  };

  onStyleLoad = () => {
    setTimeout(() => {
      this.setState({ isMapLoading: false });
      clearInterval(this.loadingTextChangeInterval);
    }, 1000);
  };

  renderDataLoadingSpinner = () =>
    this.state.isMapLoading && <Cover>{this.state.loadingText}</Cover>;

  renderCampsites = () => (
    <Layer
      type="symbol"
      layout={{ "icon-image": "campsite-15", "icon-size": 1.5 }}
    >
      {this.state.places.map(place => (
        <Feature
          key={place.id}
          onClick={() => this.onMarkClick(place)}
          coordinates={place.entity.coordinates}
        />
      ))}
    </Layer>
  );

  renderPlaceDetails = () => {
    const { selectedPlace } = this.state;

    return (
      selectedPlace.entity.coordinates && (
        <PlaceDetailsPopup
          selectedPlace={selectedPlace}
          onChangeNotificationText={this.onChangeNotificationText}
        />
      )
    );
  };

  renderCover = () =>
    this.state.isShowingAddCover && (
      <Cover onClick={this.onCloseCover}>
        <CoverText>Drag a dot to select exact place</CoverText>
      </Cover>
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

  render() {
    const { selectedPlace, isShowingAddForm, currentCenter } = this.state;

    return (
      <React.Fragment>
        {this.renderDataLoadingSpinner()}
        <Map
          style="mapbox://styles/mapbox/outdoors-v9"
          containerStyle={containerStyle}
          onMoveEnd={this.onMoveEnd}
          onMove={throttle(this.onMoveEnd, 100)}
          center={selectedPlace.entity.coordinates}
          onStyleLoad={this.onStyleLoad}
        >
          {this.renderCampsites()}
          {this.renderPlaceDetails()}
        </Map>

        {this.renderCover()}
        {this.renderAddFeature()}

        <AddPlaceMenu
          isAdding={this.state.isAdding}
          classes={this.props.classes}
          onConfirmLocation={this.onConfirmLocation}
          onAddingPlace={this.onAddingPlace}
          onCancelAdding={this.onCancelAdding}
        />
        <AddPlaceForm
          isOpen={isShowingAddForm}
          coordinates={currentCenter}
          onCloseForm={this.onCancelAdding}
        />

        <Snackbar text={this.state.notificationText} />
        <Tutorial />
      </React.Fragment>
    );
  }
}

export default App;
