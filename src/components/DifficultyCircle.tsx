import * as React from "react";
import _ from "lodash";
import { Difficulty, Colors } from "../utils/types";

interface DifficultyCircleProps {
  difficulty: number;
  size?: number;
  text?: boolean;
}

const difficultyCircle = ({
  difficulty,
  size,
  text
}: DifficultyCircleProps) => {
  const guage = (color: string) => {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: color
        }}
      ></div>
    );
  };

  switch (difficulty) {
    case 3:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage(Colors.red)}</div>
          {text ? _.capitalize(Difficulty.ADVANCED) : ""}
        </div>
      );
    case 2:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage(Colors.yellow)}</div>
          {text ? _.capitalize(Difficulty.INTERMEDIATE) : ""}
        </div>
      );
    case 1:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage(Colors.green)}</div>
          {text ? _.capitalize(Difficulty.BEGINNER) : ""}
        </div>
      );
    default:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage("green")}</div>
          {text ? "Beginner" : ""}
        </div>
      );
  }
};
difficultyCircle.defaultProps = {
  size: 15
};
export default difficultyCircle;
