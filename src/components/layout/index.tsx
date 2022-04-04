import React from "react";

import LayoutGeneric from "@nexys/headless/dist/layout";
import { ColProps, HeaderProps, RowProps } from "@nexys/headless/dist/card";
import { TabProps } from "@nexys/headless/dist/tabs";

const Card = ({ children }: { children: JSX.Element }) => <div>{children}</div>;
const Row = (p: RowProps) => <div className="row">{p.children}</div>;
const Col = (p: ColProps) => (
  <div className={`col-md-${p.width}`}>{p.children}</div>
);
const Tabs = (p: TabProps) => <div></div>;
const Header = (p: HeaderProps) => (
  <div>
    <h1>{p.title}</h1>
  </div>
);

const Layout = LayoutGeneric(Card, Tabs, Header, Col, Row);

export default Layout;
