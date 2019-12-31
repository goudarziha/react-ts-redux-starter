import * as React from "react";

interface ExerciseButtonProps {
  sets: number;
  onClick?: any;
  size?: number;
}

const ExerciseButton = ({ sets, onClick, size }: ExerciseButtonProps) => {
  const [count, setCount] = React.useState<number>(0);
  const handleUpdate = () => {
    setCount(prevCount => (prevCount >= sets ? 0 : prevCount + 1));
  };
  return (
    <button
      data-testid="exercise-button"
      onClick={() => handleUpdate()}
      style={{
        backgroundColor: "green",
        borderRadius: size,
        width: size,
        height: size,
        display: "flex",
        border: "1px solid green",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        margin: 3
      }}
    >
      {count}
    </button>
  );
};
ExerciseButton.defaultProps = {
  size: 40
};

export default ExerciseButton;
