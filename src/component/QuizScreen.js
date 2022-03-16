import QuizContent from "./QuizContent";
import { useContext } from "react";
import QuizContext from "../context/quizContext";
import { useLocation, Redirect } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const QuizScreen = () => {
  const [store] = useContext(QuizContext);
  const { questions } = { ...store };
  const query = useQuery();
  const id = parseInt(query.get("id"));
  if (questions === undefined || questions.length === 0) {
    return <Redirect to="/" />;
  }
  const Content = ({ num, question, total }) => {
    return (
      <QuizContent question={question} key={num} count={num} total={total} />
    );
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {id < questions.length ? (
        <Content num={id} question={questions[id]} total={questions.length} />
      ) : (
        <Redirect to="/result" />
      )}
    </div>
  );
};

export default QuizScreen;
