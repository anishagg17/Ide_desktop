import React from "react";
import { render } from "react-dom";
import "./App.scss";
import App from "./containers/App";

window.addEventListener("load", () => {
  render(<App />, document.querySelector(".app"));
});
