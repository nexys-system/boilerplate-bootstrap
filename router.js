import React from "./_snowpack/pkg/react.js";
import {Route, Switch} from "./_snowpack/pkg/react-router-dom.js";
import Home from "./home.js";
import links from "./links.js";
import Layout from "./layout/index.js";
const NotFound = () => /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Page Not Found"));
const AppRouter = () => /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
  exact: true,
  path: links.home.link,
  component: Home
}), /* @__PURE__ */ React.createElement(Route, {
  component: NotFound
})));
export default () => {
  return /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: links.home.link,
    component: AppRouter
  }));
};
