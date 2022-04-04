import React from "../_snowpack/pkg/react.js";
import {LoadDataAsync as LoadComponentAsyncGeneric} from "../_snowpack/pkg/@nexys/headless/dist/components/index.js";
export const Spinner = ({color}) => /* @__PURE__ */ React.createElement("div", {
  className: "spinner-border " + (color ? "text-" + color : ""),
  role: "status"
}, /* @__PURE__ */ React.createElement("span", {
  className: "sr-only"
}, "Loading..."));
export const Icon = ({name}) => /* @__PURE__ */ React.createElement("i", {
  className: `fa fa-${name}`
});
export const LoadDataAsync = LoadComponentAsyncGeneric(() => /* @__PURE__ */ React.createElement(Spinner, null));
