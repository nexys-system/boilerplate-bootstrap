import React from "../../_snowpack/pkg/react.js";
import LayoutGeneric from "../../_snowpack/pkg/@nexys/headless/dist/layout.js";
const Card = ({children}) => /* @__PURE__ */ React.createElement("div", null, children);
const Row = (p) => /* @__PURE__ */ React.createElement("div", {
  className: "row"
}, p.children);
const Col = (p) => /* @__PURE__ */ React.createElement("div", {
  className: `col-md-${p.width}`
}, p.children);
const Tabs = (p) => /* @__PURE__ */ React.createElement("div", null);
const Header = (p) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, p.title));
const Layout = LayoutGeneric(Card, Tabs, Header, Col, Row);
export default Layout;
