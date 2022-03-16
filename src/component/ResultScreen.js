import { useHistory } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../context/quizContext";
import Answers from "./Answer";
import { Redirect } from "react-router-dom";

const ResultScreen = () => {
  const [store, setStore] = useContext(QuizContext);
  const history = useHistory();
  if (store.questions === undefined || store.questions.length === 0) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-black h-96 overflow-auto text-white w-max p-20 rounded-2xl flex flex-col items-center justify-between mb-auto mt-20">
      <div className="font-semibold">
        Score is {store.score} / {store.questions.length}
      </div>
      <Answers questions={store.questions} userchoice={store.userAnswers} />
      <button
        className="bg-red-700 text-white rounded w-40"
        onClick={() => {
          setStore(() => null);
          history.push("/");
        }}
      >
        {" "}
        Play Again{" "}
      </button>
    </div>
  );
};

export default ResultScreen;
