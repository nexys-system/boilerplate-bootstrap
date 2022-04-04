import React from "react";

import { LoadDataAsync as LoadComponentAsyncGeneric } from "@nexys/headless/dist/components/index";

export const Spinner = ({ color }: { color?: "primary" | "secondary" }) => (
  <div
    className={"spinner-border " + (color ? "text-" + color : "")}
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export const Icon = ({ name }: { name: string }) => (
  <i className={`fa fa-${name}`}></i>
);

export const LoadDataAsync = LoadComponentAsyncGeneric(() => <Spinner />);
