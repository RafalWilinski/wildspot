import React from "react";
import { Feature, Layer } from "react-mapbox-gl";
import styled from "styled-components";
import throttle from "lodash.throttle";

import withMyPosition from "./enhancers/withMyPosition";
import withCampsitesCluster from "./enhancers/withCampsitesCluster";
import Snackbar from "./components/Snackbar";
import loadingTexts from "./consts/loadingTexts";
import Map from "./mapbox";
import AddPlaceForm from "./components/AddPlaceForm/container";
import AddPlaceMenu from "./components/AddPlaceMenu";
import Cover from "./components/Cover";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";
import PlaceDetailsModal from "./components/PlaceDetailsModal";
import Tutorial from "./components/Tutorial";
import BottomMenu from "./components/BottomMenu";

const containerStyle = {
  height: "100vh",
  width: "100vw"
};

const CoverText = styled.p`
  line-height: 1.15;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapLoading: true,
      isPlaceDetailsModalOpen: false,
      isAdding: false,
      isShowingAddCover: false,
      isShowingAddForm: false,
      loadingText: "",
      notificationText: "",
      places: [],
      currentCenter: (
        localStorage.getItem("lastPos") ||
        "-0.2401928739864161,51.52677435907751"
      ).split(",") || [-0.2401928739864161, 51.52677435907751]
    };
  }

  componentWillMount() {
    this.loadingTextChangeInterval = setInterval(
      () =>
        this.setState({
          loadingText:
            loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
        }),
      200
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentCenter &&
      nextProps.currentCenter[0] !== this.state.currentCenter[0]
    ) {
      this.setState({
        currentCenter: nextProps.currentCenter
      });
    }
  }

  onAddingPlace = () => {
    this.setState({
      isShowingAddCover: true,
      isAdding: false
    });
  };

  onGoToMyLocation = () => {
    this.setState({
      currentCenter: this.props.myPosition
    });
  };

  onChangeNotificationText = notificationText => {
    this.setState({
      notificationText
    });
  };

  onCloseCover = () => {
    this.setState({
      isShowingAddCover: false,
      isAdding: true
    });
  };

  onMove = e => {
    this.setState({
      currentCenter: [e.transform._center.lng, e.transform._center.lat]
    });

    localStorage.setItem("lastPos", [
      e.transform._center.lng,
      e.transform._center.lat
    ]);
  };

  onConfirmLocation = () => {
    this.setState({
      isShowingAddForm: true,
      isAdding: false
    });
  };

  onCancelAdding = () => {
    this.setState({
      isAdding: false,
      isShowingAddCover: false,
      isShowingAddForm: false
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

  renderPlaceDetails = () => {
    const { currentCenter } = this.state;
    const { selectedPlace } = this.props;

    return (
      selectedPlace.entity &&
      selectedPlace.entity.name &&
      currentCenter[0] === selectedPlace.entity.coordinates[0] && (
        <PlaceDetailsPopup
          selectedPlace={selectedPlace}
          onPlaceDetailsModalOpen={() =>
            this.setState({
              isPlaceDetailsModalOpen: true
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

  renderAddFeature = () =>
    this.state.isAdding && (
      <Layer
        type="circle"
        paint={{
          "circle-radius": 15,
          "circle-color": "#E54E52",
          "circle-opacity": 0.8
        }}
      >
        <Feature coordinates={this.state.currentCenter} />
      </Layer>
    );

  render() {
    const {
      isAdding,
      isShowingAddForm,
      isMapLoading,
      isPlaceDetailsModalOpen,
      currentCenter,
      notificationText
    } = this.state;
    const { selectedPlace, campsitesCluster, myPositionMarker } = this.props;

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
          {myPositionMarker()}
          {campsitesCluster}
          {this.renderPlaceDetails()}
          {this.renderAddFeature()}
        </Map>

        <BottomMenu
          onGoToMyLocation={this.onGoToMyLocation}
          onAddingPlace={this.onAddingPlace}
          isAdding={isAdding}
        />
        {this.renderCover()}
        <PlaceDetailsModal
          onChangeNotificationText={this.onChangeNotificationText}
          isOpen={isPlaceDetailsModalOpen}
          selectedPlace={selectedPlace}
          onClose={e => {
            this.setState({ isPlaceDetailsModalOpen: false });

            e.preventDefault();
            e.stopPropagation();
          }}
        />
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
        {!isMapLoading && <Tutorial />}
        <Snackbar text={notificationText} />
      </React.Fragment>
    );
  }
}

export default withMyPosition(withCampsitesCluster(App));
