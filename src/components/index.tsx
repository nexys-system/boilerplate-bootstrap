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

type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface NotificationProps {
  children: JSX.Element | string;
  color: Color;
}

// https://getbootstrap.com/docs/5.1/components/alerts/
export const Alert = ({ children, color = "primary" }: NotificationProps) => (
  <div className={`alert alert-${color}`} role="alert">
    {children}
  </div>
);

// https://getbootstrap.com/docs/5.1/components/badge/
export const Badge = ({ children, color = "primary" }: NotificationProps) => (
  <span className={`badge bg-${color}`}>{children}</span>
);

// https://getbootstrap.com/docs/5.1/components/badge/#pill-badges
export const Pill = ({ children, color = "primary" }: NotificationProps) => (
  <span className={`badge rounded-pill bg-${color}`}>{children}</span>
);

export const LoadDataAsync = LoadComponentAsyncGeneric(() => <Spinner />);
