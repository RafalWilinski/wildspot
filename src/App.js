import React from "react";
import { Feature, Layer, Cluster, Marker } from "react-mapbox-gl";
import styled from "styled-components";
import throttle from "lodash.throttle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import LocationSearching from "@material-ui/icons/LocationSearching";

import Snackbar from "./components/Snackbar";
import loadingTexts from "./consts/loadingTexts";
import firebase from "./firebase";
import Map from "./mapbox";
import AddPlaceForm from "./components/AddPlaceForm/container";
import AddPlaceMenu from "./components/AddPlaceMenu";
import Cover from "./components/Cover";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";
import PlaceDetailsModal from "./components/PlaceDetailsModal";
import Tutorial from "./components/Tutorial";
import BottomMenuContainer from "./components/BottomMenuContainer";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#51D5A0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    border: "2px solid #56C498",
    cursor: "pointer",
  },
};
const CoverText = styled.p`
  line-height: 1.15;
`;

const Pin = styled.span`
  margin-top: 5px;
  font-size: 2em;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapLoading: true,
      isPlaceDetailsModalOpen: false,
      isAdding: false,
      isFirebaseDataLoading: true,
      isShowingAddCover: false,
      isShowingAddForm: false,
      loadingText: "",
      notificationText: "",
      places: [],
      currentCenter: localStorage.getItem("lastPos").split(",") || [
        -0.2401928739864161,
        51.52677435907751,
      ],
      selectedPlace: {
        entity: {
          features: {},
          coordinates: [-0.2401928739864161, 51.52677435907751],
        },
      },
    };
  }

  clusterMarker = (coordinates, pointCount, getLeaves) => (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={styles.clusterMarker}
    >
      <div>{pointCount}</div>
    </Marker>
  );

  componentWillMount() {
    this.loadingTextChangeInterval = setInterval(
      () =>
        this.setState({
          loadingText:
            loadingTexts[Math.floor(Math.random() * loadingTexts.length)],
        }),
      200,
    );

    this.posWatcher = navigator.geolocation.watchPosition(
      this.onPositionChange,
    );
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref("/spots");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      const json = snap.val();

      Object.keys(json).map(key =>
        this.setState({
          places: [...this.state.places, json[key]],
          isFirebaseDataLoading: false,
        }),
      );

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

  onPositionChange = pos => {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    this.setState({
      myPosition: [lon, lat],
    });
  };

  onAddingPlace = () => {
    this.setState({
      isShowingAddCover: true,
      selectedPlace: {
        entity: { features: {}, coordinates: this.state.currentCenter },
      },
      isAdding: false,
    });
  };

  onGoToMyLocation = () => {
    this.setState({
      currentCenter: this.state.myPosition,
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
      currentCenter: selectedPlace.entity.coordinates,
    });
  };

  onMove = e => {
    this.setState({
      currentCenter: [e.transform._center.lng, e.transform._center.lat],
    });

    localStorage.setItem("lastPos", [
      e.transform._center.lng,
      e.transform._center.lat,
    ]);
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
    <Cluster ClusterMarkerFactory={this.clusterMarker}>
      {this.state.places.map((place, key) => (
        <Marker
          key={key}
          style={styles.marker}
          coordinates={place.entity.coordinates}
          data-feature={place}
          onClick={() => this.onMarkClick(place)}
        >
          <Pin role="img" aria-label={place.entity.name}>
            {/* // eslint-disable-next-line */}
            ⛺️
          </Pin>
        </Marker>
      ))}
    </Cluster>
  );

  renderPlaceDetails = () => {
    const { selectedPlace, currentCenter } = this.state;

    return (
      selectedPlace.entity &&
      selectedPlace.entity.name &&
      currentCenter[0] === selectedPlace.entity.coordinates[0] && (
        <PlaceDetailsPopup
          selectedPlace={selectedPlace}
          onPlaceDetailsModalOpen={() =>
            this.setState({
              isPlaceDetailsModalOpen: true,
            })
          }
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

  renderPlaceDetailsModal = () => (
    <PlaceDetailsModal
      onChangeNotificationText={this.onChangeNotificationText}
      isOpen={this.state.isPlaceDetailsModalOpen}
      selectedPlace={this.state.selectedPlace}
      onClose={e => {
        this.setState({ isPlaceDetailsModalOpen: false });

        e.preventDefault();
        e.stopPropagation();
      }}
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

  renderMyPosition = () => (
    <Layer
      type="circle"
      paint={{
        "circle-radius": 10,
        "circle-color": "#2176ff",
        "circle-opacity": 0.8,
      }}
    >
      <Marker coordinates={this.state.myPosition} />
    </Layer>
  );

  render() {
    const { isShowingAddForm, currentCenter } = this.state;

    return (
      <React.Fragment>
        {this.renderDataLoadingSpinner()}

        <Map
          style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line react/style-prop-object
          containerStyle={containerStyle}
          onMoveEnd={this.onMove}
          onMove={throttle(this.onMove, 100)}
          center={currentCenter}
          onStyleLoad={this.onStyleLoad}
        >
          {this.renderCampsites()}
          {this.renderPlaceDetails()}
          {this.renderAddFeature()}
          {this.renderMyPosition()}
        </Map>

        {!this.state.isAdding && (
          <BottomMenuContainer flexFlow="row-reverse">
            <Button onClick={this.onAddingPlace} variant="fab" color="primary">
              <AddIcon />
            </Button>
            <Button
              onClick={this.onGoToMyLocation}
              variant="fab"
              color="secondary"
            >
              <LocationSearching />
            </Button>
          </BottomMenuContainer>
        )}

        {this.renderCover()}
        {this.renderPlaceDetailsModal()}

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

        {!this.state.isMapLoading && <Tutorial />}

        <Snackbar text={this.state.notificationText} />
      </React.Fragment>
    );
  }
}

export default App;
