import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.text &&
      nextProps.text !== "" &&
      nextProps.text.length > 2 &&
      nextProps.text !== this.props.text
    ) {
      this.setState({
        open: true,
      });
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, text } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{text}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
