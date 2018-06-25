import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const geocodingUrl = "https://api.mapbox.com/geocoding/v5";
const mapboxGeocoding = query =>
  `${geocodingUrl}/mapbox.places/${query}.json?access_token=${
    process.env.REACT_APP_MAPBOX_KEY
  }`;

const req = (url, body, method = "GET") =>
  new Request(url, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Charset": "utf-8"
    }),
    body
  });

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

const TopContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 10px 15px;
  background-color: ${props =>
    props.visible ? "rgba(255, 255, 255, 0.75)" : "transparent"};
  z-index: 100000;
`;

class IntegrationAutosuggest extends React.Component {
  state = {
    value: "",
    suggestions: [],
    isSearchVisible: false
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 2) {
      fetch(req(mapboxGeocoding(value)))
        .then(res => res.json())
        .then(data => {
          this.setState({
            suggestions: data.features.map(poi => ({
              value: poi.center,
              label: poi.text
            }))
          });
        });
    }
  };

  openSearch = () => {
    this.setState({
      isSearchVisible: true
    });
  };

  handleSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      isSearchVisible: false
    });
    this.props.onLocationChanged(suggestion.value);
  };

  closeSearch = () => {
    this.setState({
      isSearchVisible: false
    });
  };

  renderAutosuggest() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: "Search a place",
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    );
  }

  render() {
    return (
      <TopContainer visible={this.state.isSearchVisible}>
        {!this.state.isSearchVisible ? (
          <SearchIcon onClick={this.openSearch} />
        ) : (
          <div style={{ display: "flex" }}>
            <CloseIcon
              onClick={this.closeSearch}
              style={{ margin: "5px 5px 0 0" }}
            />
            {this.renderAutosuggest()}
          </div>
        )}
      </TopContainer>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
