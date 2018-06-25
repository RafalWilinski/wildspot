import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import LocationSearching from "@material-ui/icons/LocationSearching";
import BottomMenuContainer from "../BottomMenuContainer";

export default ({ isAdding, onAddingPlace, onGoToMyLocation }) =>
  !isAdding && (
    <BottomMenuContainer flexFlow="row-reverse">
      <Button onClick={onAddingPlace} variant="fab" color="primary">
        <AddIcon />
      </Button>
      <Button
        onClick={onGoToMyLocation}
        variant="fab"
        color="secondary"
        style={{ marginRight: "10px" }}
      >
        <LocationSearching />
      </Button>
    </BottomMenuContainer>
  );
