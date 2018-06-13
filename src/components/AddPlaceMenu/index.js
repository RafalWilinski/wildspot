import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import BottomMenuContainer from "../BottomMenuContainer";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const AddPlaceMenu = props =>
  props.isAdding ? (
    <BottomMenuContainer flexFlow="column">
      <Button
        color="primary"
        variant="contained"
        className={this.props.classes.button}
        size="large"
      >
        <Save
          className={classNames(
            props.classes.leftIcon,
            props.classes.iconSmall,
          )}
        />
        Add Location
      </Button>
      <Button
        variant="contained"
        onClick={props.onCancelAdding}
        className={props.classes.button}
        size="large"
      >
        Cancel
      </Button>
    </BottomMenuContainer>
  ) : (
    <BottomMenuContainer flexFlow="row-reverse">
      <Button onClick={props.onAddingPlace} variant="fab" color="primary">
        <AddIcon />
      </Button>
    </BottomMenuContainer>
  );

AddPlaceMenu.propTypes = {
  onAddingPlace: PropTypes.func.isRequired,
  onCancelAdding: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isAdding: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AddPlaceMenu);
