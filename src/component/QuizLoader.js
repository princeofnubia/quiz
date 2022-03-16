/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { useContext, useEffect } from "react";
import useQuestion from "../hooks/useQuestion";
import QuizContext from "../context/quizContext";

const QuizLoader = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [store, setStore] = useContext(QuizContext);
  const [questions, status] = useQuestion();

  useEffect(() => {
    if (status === "loaded") {
      setStore({ questions, score: 0, userAnswers: [] });
      history.push(`quiz?id=${0}`);
    }
  }, [status]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default QuizLoader;
