import ReactDOM from "react-dom";
import App from "./Components/App/App.jsx";
import React from "react";
import store from "./Redux/Store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
