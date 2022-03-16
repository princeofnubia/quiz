import { useHistory } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../context/quizContext";
import QuestionBody from "./QuestionBody";

const QuizContent = ({ question, count, total }) => {
  const [store, setStore] = useContext(QuizContext);
  const history = useHistory();

  const handleAnswer = (e) => {
    let { score, userAnswers, questions } = { ...store };
    let choice = e.target.dataset.choice;
    let currentQuestion = question;
    userAnswers = [...userAnswers, choice];
    if (currentQuestion["correct_answer"] === choice) {
      score = score + 1;
    }
    setStore({ userAnswers, score, questions });
    history.push(`quiz?id=${count + 1}`);
  };

  return (
    <div className="bg-yellow-300 w-full h-96 m-5 rounded-2xl flex flex-col items-center justify-between">
      <QuestionBody
        category={question.category}
        question={question.question}
        count={count}
        total={total}
      />

      <div className="d-flex mb-3">
        <button
          type="button"
          className="mx-1 bg-green-600 text-white p-1 w-40 rounded"
          data-choice="True"
          onClick={handleAnswer}
        >
          True
        </button>
        <button
          type="button"
          className="mx-1 bg-red-600 text-white p-1 w-40 rounded"
          data-choice="False"
          onClick={handleAnswer}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default QuizContent;
