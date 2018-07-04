import React from "react";
import { Cluster, Marker } from "react-mapbox-gl";
import styled from "styled-components";

import firebase from "../firebase";

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

const Pin = styled.span`
  margin-top: 5px;
  font-size: 2em;
`;

const withCampsitesCluster = WrappedComponent =>
  class extends React.Component {
    state = {
      places: [],
      selectedPlaceId: -1,
      currentCenter: (
        localStorage.getItem("lastPos") || "15.629874169513641,43.7947716883578"
      ).split(",") || [15.629874169513641, 43.7947716883578],
    };

    componentDidMount() {
      this.firebaseRef = firebase.database().ref("/spots");

      this.firebaseCallback = this.firebaseRef.on("value", snap => {
        const json = snap.val();

        if (json) {
          Object.keys(json).map(key =>
            this.setState({
              places: [
                ...this.state.places.filter(place => place.id !== key),
                json[key],
              ],
            }),
          );

          if (window.location.pathname) {
            const selectedPlaceId = window.location.pathname.slice(1);
            const selectedPlace = this.state.places.filter(
              ({ id }) => id === selectedPlaceId,
            )[0];

            if (selectedPlace) {
              if (selectedPlaceId) {
                this.setState({
                  selectedPlaceId,
                  currentCenter: selectedPlace.entity.coordinates,
                });
              }
            }
          }
        }
      });

      console.log(this.props.seoPlace);

      if (this.props.seoPlace) {
        setTimeout(() => {
          this.setState({
            currentCenter: [
              this.props.seoPlace.latlng[1],
              this.props.seoPlace.latlng[0],
            ],
          });
        }, 1000);
      }
    }

    componentWillUnmount() {
      this.firebaseRef.off("value", this.firebaseCallback);
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

    onMarkClick = selectedPlace => {
      this.setState({
        selectedPlaceId: selectedPlace.id,
        currentCenter: selectedPlace.entity.coordinates,
      });
    };

    onChangeCurrentCenter = coordinates => {
      this.setState({
        currentCenter: coordinates,
      });
    };

    getSelectedPlace = id =>
      this.state.places.filter(place => place.id === id)[0];

    render() {
      const { selectedPlaceId, places } = this.state;

      return (
        <WrappedComponent
          campsitesCluster={
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {places.map((place, key) => (
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
          }
          selectedPlace={this.getSelectedPlace(selectedPlaceId)}
          currentCenter={this.state.currentCenter}
          firebaseRef={this.firebaseRef}
          onChangeCurrentCenter={this.onChangeCurrentCenter}
          {...this.props}
        />
      );
    }
  };

export default withCampsitesCluster;
