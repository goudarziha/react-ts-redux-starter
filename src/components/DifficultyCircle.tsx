import * as React from "react";

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
          <div className="mr-1">{guage("red")}</div>
          {text ? " Advanced" : ""}
        </div>
      );
    case 2:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage("yellow")}</div>
          {text ? " Intermediate" : ""}
        </div>
      );
    case 1:
      return (
        <div
          data-testid="difficulty-test"
          className="d-flex flex-row align-items-center"
        >
          <div className="mr-1">{guage("green")}</div>
          {text ? "Beginner" : ""}
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
