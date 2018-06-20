import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Tutorial extends Component {
  state = {
    showTutorial: !localStorage.getItem("tutorialPlayed"),
  };

  onTutorialHide = () => {
    this.setState({
      showTutorial: false,
    });
    localStorage.setItem("tutorialPlayed", true);
  };

  render() {
    return (
      <Dialog onClose={this.onTutorialHide} open={this.state.showTutorial}>
        <DialogTitle>Welcome to Wildspot!</DialogTitle>
        <DialogContent>
          <DialogContentText>Desc</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Tutorial;
