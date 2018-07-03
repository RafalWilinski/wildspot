import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./index.css";
import App from "./App";
import About from "./About";
import countryCoordinateSeoMapping from "./consts/countryCoordinateSeoMapping";
import registerServiceWorker from "./registerServiceWorker";

ReactGA.initialize(process.env.REACT_APP_GA_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

if (window.location.pathname === "/about") {
  ReactDOM.render(<About />, document.getElementById("root"));
} else {
  const place = countryCoordinateSeoMapping.filter(
    entry => entry.path === window.location.pathname,
  )[0];

  ReactDOM.render(<App seoPlace={place} />, document.getElementById("root"));
}

registerServiceWorker();
