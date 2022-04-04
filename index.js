import React from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import {BrowserRouter} from "./_snowpack/pkg/react-router-dom.js";
import AppRouter from "./router.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(AppRouter, null)), document.getElementById("root"));
