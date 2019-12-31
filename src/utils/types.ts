import { Enum } from "@martin_hotell/rex-tils";

export type Severity = Enum<typeof Severity>;
export const Severity = Enum("DANGER", "WARNING", "INFO", "SUCCESS", "DEFAULT");

export type BadgeType = Enum<typeof BadgeType>;
export const BadgeType = Enum(
  "PRIMARY",
  "SECONDARY",
  "SUCCESS",
  "DANGER",
  "WARNING",
  "INFO",
  "LIGHT",
  "DARK"
);
