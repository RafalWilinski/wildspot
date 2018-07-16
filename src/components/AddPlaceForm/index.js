import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";

import Error from "../Error";
import firebase from "../../firebase";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  progress: {
    display: "block",
    margin: theme.spacing.unit * 2,
  },
  root: {
    opacity: 0.2,
    "&$checked": {
      opacity: 1,
    },
  },
  checked: {},
  buttonProgress: {
    color: "#aaa",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  top: 0;
  z-index: 1000;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  height: 32px;
`;

class AddPlaceForm extends Component {
  state = {
    isUploading: false,
  };

  constructor(props) {
    super(props);
    this.storage = firebase.storage().ref();

    window.history.pushState("⛺️ Wildspot", "", "/");
  }

  onAttachFiles = files => {
    this.setState({
      isUploading: true,
    });

    files.forEach(file => {
      this.storage
        .child(`images/${+new Date()}.jpg`)
        .put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(img => {
          this.setState({
            isUploading: false,
          });

          this.props.setFieldValue("images", [
            ...this.props.values.images,
            img,
          ]);
        });
    });
  };

  onImageRemove = img => {
    this.props.setFieldValue("images", [
      ...this.props.values.images.filter(i => i !== img),
    ]);
  };

  render() {
    const {
      isOpen,
      values,
      handleChange,
      handleSubmit,
      onCloseForm,
      isSubmitting,
      classes,
      fullScreen,
      errors,
      error,
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">Add a spot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you think it's great spot and you'd like to share it with others?
            Great! If you could fill some more info, that would be great!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Spot Name"
            type="text"
            onChange={handleChange}
            name="name"
            fullWidth
          />
          {errors.name && <Error>{errors.name}</Error>}
          <FormControl
            className={this.props.classes.formControl}
            fullWidth
            style={{ margin: "0 0 20px" }}
          >
            <InputLabel htmlFor="age-helper">Groundwork</InputLabel>
            <Select
              value={values.groundwork}
              onChange={handleChange}
              input={<Input name="groundwork" />}
            >
              <MenuItem value="sand">Sand</MenuItem>
              <MenuItem value="soil">Soil</MenuItem>
              <MenuItem value="grass">Grass</MenuItem>
              <MenuItem value="gravel">Gravel</MenuItem>
              <MenuItem value="stones">Stones</MenuItem>
            </Select>
            <FormHelperText>
              Some grounds are not so suitable for tents
            </FormHelperText>
            {errors.groundwork && <Error>{errors.groundwork}</Error>}
          </FormControl>
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.wifi"
                onChange={handleChange}
                icon={"📵"}
                checkedIcon={"📡"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="WiFi Access"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.ac"
                onChange={handleChange}
                icon={"🚨"}
                checkedIcon={"🔌"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="A/C Power Access"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.grocery"
                onChange={handleChange}
                icon={"🛒"}
                checkedIcon={"🛒"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Grocery Nearby"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.water"
                onChange={handleChange}
                icon={"🚰"}
                checkedIcon={"🚰"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Water Access"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.trash"
                onChange={handleChange}
                icon={"🗑"}
                checkedIcon={"🗑"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Trash Nearby"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.cellular"
                onChange={handleChange}
                icon={"📶"}
                checkedIcon={"📶"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Cellular Access"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.car"
                onChange={handleChange}
                icon={"🚗"}
                checkedIcon={"🚗"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Accessible by car"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.bike"
                onChange={handleChange}
                icon={"🚴‍"}
                checkedIcon={"🚴‍"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Accessible by bike"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.food"
                onChange={handleChange}
                icon={"😔"}
                checkedIcon={"🍽"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Food nearby"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.gasStation"
                onChange={handleChange}
                icon={"⛽️"}
                checkedIcon={"⛽️"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Gas station nearby"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.beach"
                onChange={handleChange}
                icon={"🏖"}
                checkedIcon={"🏖"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Beach Access"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.notCrowded"
                onChange={handleChange}
                icon={"👨‍👩‍👧‍👦"}
                checkedIcon={"💆‍"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Crowded / Empty"
          />

          <StyledFormControlLabel
            control={
              <Checkbox
                id="features.quiet"
                onChange={handleChange}
                icon={"📣"}
                checkedIcon={"🤫"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Loud / Quiet"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                icon={"🏕"}
                id="features.campingAllowed"
                checkedIcon={"🏕"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Camping Allowed"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                icon={"🙈"}
                id="features.pets"
                checkedIcon={"🐯"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Animals Nearby"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                id="features.wc"
                icon={"🚽"}
                checkedIcon={"🚽"}
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="WC Nearby"
          />
          {!this.state.isUploading && (
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={this.onAttachFiles}
              style={{
                height: "100px",
                borderWidth: "1px",
                borderColor: "rgb(200, 202, 202)",
                backgroundColor: "#EEEEEE",
                borderStyle: "solid",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Chip label="Upload place images" className={classes.chip} />
            </Dropzone>
          )}
          {this.state.isUploading && (
            <CircularProgress className={classes.progress} />
          )}
          <GridList
            cellHeight={160}
            className={classes.gridList}
            cols={3}
            style={{ marginTop: "10px" }}
          >
            {values.images.filter(Boolean).map(
              img =>
                img && (
                  <GridListTile key={img} cols={1} alt="Image">
                    <StyledIconButton
                      className={classes.button}
                      aria-label="Delete"
                      onClick={() => this.onImageRemove(img)}
                    >
                      <DeleteIcon />
                    </StyledIconButton>
                    <img src={img} alt={`${this.props.values.name}`} />
                  </GridListTile>
                ),
            )}
          </GridList>
          <TextField
            id="description"
            label="Extra Info/Remarks"
            multiline
            rows="3"
            defaultValue=""
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            fullWidth
          />
          {error && <Error>{JSON.stringify(error)}</Error>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseForm} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isSubmitting}
          >
            Add Place
            {isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(AddPlaceForm));
