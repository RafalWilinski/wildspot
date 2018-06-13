import React, { Component } from "react";
import Dropzone from "react-dropzone";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SignalWifiOff from "@material-ui/icons/SignalWifiOff";
import SignalWifi3Bar from "@material-ui/icons/SignalWifi3Bar";
import BatteryCharging90 from "@material-ui/icons/BatteryCharging90";
import BatteryAlert from "@material-ui/icons/BatteryAlert";
import LocalGroceryStore from "@material-ui/icons/LocalGroceryStore";
import LocalDrink from "@material-ui/icons/LocalDrink";
import SignalCellular4Bar from "@material-ui/icons/SignalCellular4Bar";
import SignalCellularOff from "@material-ui/icons/SignalCellularOff";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import LocalDining from "@material-ui/icons/LocalDining";
import LocalGasStation from "@material-ui/icons/LocalGasStation";
import BeachAccess from "@material-ui/icons/BeachAccess";
import Group from "@material-ui/icons/Group";
import NotificationsActive from "@material-ui/icons/NotificationsActive";
import NotificationsOff from "@material-ui/icons/NotificationsOff";
import Home from "@material-ui/icons/Home";
import Pets from "@material-ui/icons/Pets";
import Wc from "@material-ui/icons/Wc";

import firebase from "../../firebase";

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
    margin: theme.spacing.unit * 2,
  },
});

class AddPlaceForm extends Component {
  state = {
    isUploading: false,
  };

  constructor(props) {
    super(props);
    this.storage = firebase.storage().ref();
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

  render() {
    const {
      isOpen,
      values,
      handleChange,
      handleSubmit,
      onCancelForm,
      classes,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
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
          <FormControl className={this.props.classes.formControl} fullWidth>
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
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                id="features.wifi"
                onChange={handleChange}
                icon={<SignalWifiOff />}
                checkedIcon={<SignalWifi3Bar />}
                value="checkedH"
              />
            }
            label="WiFi Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.ac"
                onChange={handleChange}
                icon={<BatteryAlert />}
                checkedIcon={<BatteryCharging90 />}
                value="checkedH"
              />
            }
            label="A/C Power Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.grocery"
                onChange={handleChange}
                icon={<LocalGroceryStore />}
                checkedIcon={<LocalGroceryStore />}
                value="checkedH"
              />
            }
            label="Grocery Nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.water"
                onChange={handleChange}
                icon={<LocalDrink />}
                checkedIcon={<LocalDrink />}
                value="checkedH"
              />
            }
            label="Water Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.cellular"
                onChange={handleChange}
                icon={<SignalCellularOff />}
                checkedIcon={<SignalCellular4Bar />}
                value="checkedH"
              />
            }
            label="Cellular Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.car"
                onChange={handleChange}
                icon={<DirectionsCar />}
                checkedIcon={<DirectionsCar />}
                value="checkedH"
              />
            }
            label="Accessible by car"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.food"
                onChange={handleChange}
                icon={<LocalDining />}
                checkedIcon={<LocalDining />}
                value="checkedH"
              />
            }
            label="Food nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.gasStation"
                onChange={handleChange}
                icon={<LocalGasStation />}
                checkedIcon={<LocalGasStation />}
                value="checkedH"
              />
            }
            label="Gas station nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.beach"
                onChange={handleChange}
                icon={<BeachAccess />}
                checkedIcon={<BeachAccess />}
                value="checkedH"
              />
            }
            label="Beach Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="features.notCrowded"
                onChange={handleChange}
                icon={<Group />}
                checkedIcon={<Group />}
                value="checkedH"
              />
            }
            label="Crowded / Empty"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="features.quiet"
                onChange={handleChange}
                icon={<NotificationsActive />}
                checkedIcon={<NotificationsOff />}
                value="checkedH"
              />
            }
            label="Loud / Quiet"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                icon={<Home />}
                id="features.campingAllowed"
                checkedIcon={<Home />}
                value="checkedH"
              />
            }
            label="Camping Allowed"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                icon={<Pets />}
                id="features.pets"
                checkedIcon={<Pets />}
                value="checkedH"
              />
            }
            label="Animals Nearby"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                id="features.wc"
                icon={<Wc />}
                checkedIcon={<Wc />}
                value="checkedH"
              />
            }
            label="WC Nearby"
          />
          {!this.state.isUploading && (
            <Dropzone
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
              }}
            >
              <Chip
                label="Try dropping some files here, or click to select files to upload."
                className={classes.chip}
              />
            </Dropzone>
          )}
          {this.state.isUploading && (
            <CircularProgress className={classes.progress} />
          )}
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {values.images.map(img => (
              <GridListTile key={img} cols={1}>
                <img src={img} />
              </GridListTile>
            ))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Place
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddPlaceForm);
