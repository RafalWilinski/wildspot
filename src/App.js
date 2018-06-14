import React from "react";
import { Feature, Layer } from "react-mapbox-gl";

import firebase from "./firebase";
import Map from "./mapbox";
import AddPlaceForm from "./components/AddPlaceForm/container";
import AddPlaceMenu from "./components/AddPlaceMenu";
import Cover from "./components/Cover";
import PlaceDetailsPopup from "./components/PlaceDetailsPopup";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      selectedPlace: { entity: {} },
      isAdding: false,
      isShowingAddCover: false,
      isShowingAddForm: false,
      currentCenter: [-0.481747846041145, 51.3233379650232],
    };
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref("/spots");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      const json = snap.val();

      Object.keys(json).map(key => {
        return this.setState({ places: [...this.state.places, json[key]] });
      });
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

  render() {
    const { selectedPlace, isShowingAddForm, currentCenter } = this.state;

    return (
      <Map
        style="mapbox://styles/mapbox/outdoors-v9"
        containerStyle={containerStyle}
        onMoveEnd={this.onMoveEnd}
        center={selectedPlace.entity.coordinates}
      >
        {this.renderCampsites()}
        {this.renderPlaceDetails()}
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
      </Map>
    );
  }
}

export default App;
