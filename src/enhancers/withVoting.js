import React from "react";

const withVoting = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.uid = localStorage.getItem("uid");
      this.state = {
        selectedPlace: {},
      };
    }

    componentDidMount() {
      if (this.props.selectedPlace) {
        this.place = this.props.firebaseRef.child(this.props.selectedPlace.id);

        this.place.on("value", snap => {
          this.setState({ selectedPlace: snap.val() });
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.selectedPlace.id &&
        this.props.selectedPlace.id !== nextProps.selectedPlace.id
      ) {
        this.place = this.props.firebaseRef.child(nextProps.selectedPlace.id);
      }
    }

    onVote = () => {
      if (this.place) {
        this.place.transaction(place => {
          if (place) {
            if (!place.votesCount) {
              place.votesCount = 0;
            }

            if (place.votes && place.votes[this.uid]) {
              place.votesCount--;
              place.votes[this.uid] = null;
            } else {
              place.votesCount++;
              if (!place.votes || typeof place.votes !== "object") {
                place.votes = {};
              }
              place.votes[this.uid] = true;
            }
          }

          return place;
        });
      } else {
        console.log("place not defined");
      }
    };

    isVoted = () =>
      this.state.selectedPlace &&
      this.state.selectedPlace.votes &&
      this.state.selectedPlace.votes[this.uid];

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onVote={this.onVote}
          isVoted={this.isVoted()}
        />
      );
    }
  };
};

export default withVoting;
