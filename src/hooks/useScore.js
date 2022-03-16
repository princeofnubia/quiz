import { useState } from "react";

const useScore = () => {
  const [score, setScore] = useState(0);

  function updateScore(score) {
    setScore(score);
  }

  return [score, updateScore];
};

export default useScore;
