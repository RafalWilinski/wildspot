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
import PlaceDetailsModal from "./components/PlaceDetailsModal";
import Tutorial from "./components/Tutorial";
import BottomMenu from "./components/BottomMenu";
import PlacesSearch from "./components/PlacesSearch";

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
      isAdding: false,
      isShowingAddCover: false,
      isShowingAddForm: false,
      loadingText: "",
      notificationText: "",
      places: [],
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

  onAddingPlace = () => {
    this.setState({
      isShowingAddCover: true,
      isAdding: false,
    });
  };

  onGoToMyLocation = () => {
    this.props.onChangeCurrentCenter(this.props.myPosition);
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

  onMove = e => {
    this.props.onChangeCurrentCenter([
      e.transform._center.lng,
      e.transform._center.lat,
    ]);

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
        <Feature coordinates={this.props.currentCenter} />
      </Layer>
    );

  render() {
    const {
      isAdding,
      isShowingAddForm,
      isMapLoading,
      notificationText,
    } = this.state;
    const {
      selectedPlace,
      campsitesCluster,
      myPositionMarker,
      currentCenter,
    } = this.props;

    return (
      <React.Fragment>
        {this.renderDataLoadingSpinner()}
        <Map
          style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line react/style-prop-object
          containerStyle={containerStyle}
          onMoveEnd={this.onMove}
          onMove={throttle(this.onMove, 250)}
          center={currentCenter}
          onStyleLoad={this.onStyleLoad}
        >
          {myPositionMarker()}
          {campsitesCluster}
          {this.renderAddFeature()}
        </Map>
        <PlacesSearch onLocationChanged={this.props.onChangeCurrentCenter} />
        <BottomMenu
          onGoToMyLocation={this.onGoToMyLocation}
          onAddingPlace={this.onAddingPlace}
          isAdding={isAdding}
        />
        {this.renderCover()}
        {selectedPlace && (
          <PlaceDetailsModal
            onChangeNotificationText={this.onChangeNotificationText}
            isOpen={
              !!(
                selectedPlace &&
                selectedPlace.entity &&
                selectedPlace.entity.name
              )
            }
            selectedPlace={selectedPlace}
            onClose={e => {
              this.props.onChangeSelectedPlaceId(-1);
              e.preventDefault();
              e.stopPropagation();
            }}
            firebaseRef={this.props.firebaseRef}
          />
        )}
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
