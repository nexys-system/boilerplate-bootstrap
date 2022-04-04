import React from "../_snowpack/pkg/react.js";
import {LoadDataAsync as LoadComponentAsyncGeneric} from "../_snowpack/pkg/@nexys/headless/dist/components/index.js";
import TabsGeneric from "../_snowpack/pkg/@nexys/headless/dist/tabs.js";
export const Spinner = ({color}) => /* @__PURE__ */ React.createElement("div", {
  className: "spinner-border " + (color ? "text-" + color : ""),
  role: "status"
}, /* @__PURE__ */ React.createElement("span", {
  className: "sr-only"
}, "Loading..."));
export const Icon = ({name}) => /* @__PURE__ */ React.createElement("i", {
  className: `fa fa-${name}`
});
export const Alert = ({children, color = "primary"}) => /* @__PURE__ */ React.createElement("div", {
  className: `alert alert-${color}`,
  role: "alert"
}, children);
export const Badge = ({children, color = "primary"}) => /* @__PURE__ */ React.createElement("span", {
  className: `badge bg-${color}`
}, children);
export const Pill = ({children, color = "primary"}) => /* @__PURE__ */ React.createElement("span", {
  className: `badge rounded-pill bg-${color}`
}, children);
export const LoadDataAsync = LoadComponentAsyncGeneric(() => /* @__PURE__ */ React.createElement(Spinner, null));
const Ul = ({children}) => /* @__PURE__ */ React.createElement("ul", {
  className: "nav nav-tabs"
}, children);
const Li = ({
  label,
  onClick,
  isSelected
}) => /* @__PURE__ */ React.createElement("li", {
  onClick,
  className: "nav-item"
}, /* @__PURE__ */ React.createElement("a", {
  className: "nav-link " + (isSelected === true ? "active" : ""),
  "aria-current": "page",
  href: "#"
}, label));
export const Tabs = TabsGeneric(Ul, Li);
