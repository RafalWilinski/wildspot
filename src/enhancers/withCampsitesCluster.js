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
      selectedPlace: {
        entity: {
          features: {},
          coordinates: [-0.2401928739864161, 51.52677435907751],
        },
      },
    };

    componentDidMount() {
      this.firebaseRef = firebase.database().ref("/spots");
      this.firebaseCallback = this.firebaseRef.on("value", snap => {
        const json = snap.val();

        Object.keys(json).map(key =>
          this.setState({
            places: [...this.state.places, json[key]],
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
        selectedPlace,
        currentCenter: selectedPlace.entity.coordinates,
      });
    };

    render() {
      const { selectedPlace, places } = this.state;

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
          selectedPlace={selectedPlace}
          currentCenter={this.state.currentCenter}
          {...this.props}
        />
      );
    }
  };

export default withCampsitesCluster;
