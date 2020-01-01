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

export type Difficulty = Enum<typeof Difficulty>;
export const Difficulty = Enum("ADVANCED", "INTERMEDIATE", "BEGINNER");

export type Colors = Enum<typeof Colors>;
export const Colors = Enum("white", "red", "yellow", "green");
