import React from "react";
import { Layer, Marker } from "react-mapbox-gl";

const withMyPosition = WrappedComponent =>
  class extends React.Component {
    state = {};

    componentWillMount() {
      this.posWatcher = navigator.geolocation.watchPosition(
        this.onPositionChange,
      );
    }

    onPositionChange = pos => {
      this.setState({
        myPosition: [pos.coords.longitude, pos.coords.latitude],
      });
    };

    render() {
      const { myPosition } = this.state;

      return (
        <WrappedComponent
          myPosition={myPosition}
          myPositionMarker={() => (
            <Layer
              type="circle"
              paint={{
                "circle-radius": 10,
                "circle-color": "#2176ff",
                "circle-opacity": 0.8,
              }}
            >
              {myPosition &&
                myPosition[0] && <Marker coordinates={myPosition} />}
            </Layer>
          )}
          {...this.props}
        />
      );
    }
  };

export default withMyPosition;
