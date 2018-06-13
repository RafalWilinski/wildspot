import React from "react";
import { Feature, Layer } from "react-mapbox-gl";

import firebase from "./firebase";
import Cover from "./components/Cover";
import Button from "./components/Button";
import AddButton from "./components/Button/Add";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";
import Map from "./mapbox";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

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
    if (!this.state.isAdding) {
      this.setState({
        currentCenter: [e.transform._center.lng, e.transform._center.lat],
      });
    }
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
        <Feature coordinates={this.state.currentCenter} draggable />
      </Layer>
    );

  renderAddButton = () =>
    this.state.isAdding ? (
      <div>
        <Button
          confirm
          primary
          extraBottomSpace="40px"
          text="Confirm Location"
        />
        <Button confirm inactive text="Cancel" onClick={this.onCancelAdding} />
      </div>
    ) : (
      <AddButton onClick={this.onAddingPlace} />
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

export default App;
