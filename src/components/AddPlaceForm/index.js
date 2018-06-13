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

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class AddPlaceForm extends Component {
  onAttachFiles = files => {};

  render() {
    const { isOpen, values, handleChange } = this.props;

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
            fullWidth
          />
          <FormControl className={this.props.classes.formControl} fullWidth>
            <InputLabel htmlFor="age-helper">Groundwork</InputLabel>
            <Select
              value={values.groundWork}
              onChange={handleChange}
              input={<Input name="groundWork" />}
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
                icon={<NotificationsActive />}
                checkedIcon={<NotificationsOff />}
                value="checkedH"
              />
            }
            label="Loud / Quiet"
          />
          <Dropzone onDrop={this.onAttachFiles}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
          <TextField
            id="multiline-static"
            label="Extra Info/Remarks"
            multiline
            rows="3"
            defaultValue=""
            className={this.props.classes.textField}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Add Place
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddPlaceForm);
