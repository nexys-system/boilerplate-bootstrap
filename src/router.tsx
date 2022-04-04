import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";

import links, { publicLinks } from "./links";

import Layout from "./layout";

const NotFound = () => (
  <p>
    <i>Page Not Found</i>
  </p>
);

const AppRouter = () => (
  <Layout>
    <Switch>
      <Route exact path={links.home.link} component={Home} />

      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default () => {
  return (
    <Switch>
      <Route path={links.home.link} component={AppRouter} />
    </Switch>
  );
};
