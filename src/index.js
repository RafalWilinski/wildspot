import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./index.css";
import App from "./App";
import About from "./About";
import Countries from "./Countries";
import countries from "./consts/countries";
import registerServiceWorker from "./registerServiceWorker";
import { normalizeNameToURI } from "./utils";

ReactGA.initialize(process.env.REACT_APP_GA_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

if (window.location.pathname === "/about") {
  ReactDOM.render(<About />, document.getElementById("root"));
} else if (window.location.pathname === "/countries") {
  ReactDOM.render(
    <Countries countries={countries} />,
    document.getElementById("root"),
  );
} else {
  const place = countries.filter(
    entry => `/${normalizeNameToURI(entry.name)}` === window.location.pathname,
  )[0];

  ReactDOM.render(
    <App seoPlace={place} search={window.location.search} />,
    document.getElementById("root"),
  );
}

registerServiceWorker();
