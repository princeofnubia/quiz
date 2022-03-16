import parseHTML from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const Answers = ({ questions, userchoice }) => {
  const list = questions.map((question, index) => {
    return (
      <div
        className="flex flex-center px-5 border-b-2 py-1 my-5 justify-between"
        key={index}
      >
        <div>
          {question.correct_answer === userchoice[index] ? (
            <span className="text-green-600 text-3xl font-extrabold">
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </span>
          ) : (
            <span className="text-red-600 text-3xl font-extrabold">
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </span>
          )}
        </div>
        <div className="w-80 mx-3">{parseHTML(question.question)}</div>
        <div>
          {question.correct_answer === userchoice[index] ? (
            <span className="text-green-600">{userchoice[index]}</span>
          ) : (
            <span className="text-red-600">{userchoice[index]}</span>
          )}
        </div>
      </div>
    );
  });

  return <div>{list}</div>;
};

export default Answers;
