import QuizLoader from "./QuizLoader";
import { useState } from "react";

const HomeScreen = () => {
  const [start, setStart] = useState(false);

  const handleClick = () => {
    setStart(true);
  };

  const HomePage = () => {
    return (
      <div className="bg-black text-white h-96 my-1 w-auto shadow-sm rounded-2xl p-6 flex flex-col items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl">
            Welcome to Trivia Challenge
          </h1>
        </div>
        <div>
          <h2 className="font-bold text-2xl">
            {" "}
            You will be presented with 10 True or False Questions{" "}
          </h2>
        </div>
        <div>
          <h2 className="font-bold text-2xl"> Can you Score the 100% ? </h2>
        </div>
        <button
          type="button"
          className="bg-red-600 text-white p-1 w-40 rounded"
          onClick={handleClick}
        >
          Start
        </button>
      </div>
    );
  };

  return <div className="">{start ? <QuizLoader /> : <HomePage />}</div>;
};

export default HomeScreen;
