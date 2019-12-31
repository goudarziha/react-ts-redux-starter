import * as React from "react";
import _ from "lodash";
import { BadgeType } from "../utils";

interface BadgeProps {
  text: string;
  type?: string;
}

const Badge = ({ text, type }: BadgeProps) => {
  if (!_.isEmpty(type)) {
    switch (type) {
      case BadgeType.DANGER:
        type = "badge-danger";
        break;
      case BadgeType.SECONDARY:
        type = "badge-secondary";
        break;
      case BadgeType.SUCCESS:
        type = "badge-success";
        break;
      case BadgeType.INFO:
        type = "badge-info";
        break;
      case BadgeType.DARK:
        type = "badge-dark";
        break;
      case BadgeType.WARNING:
        type = "badge-warning";
        break;
      default:
        type = "badge-primary";
        break;
    }
  }
  return (
    <span className={`badge ${type}`} data-testid="badge">
      {text}
    </span>
  );
};

Badge.defaultProps = {
  type: "badge-primary"
};
export default Badge;
