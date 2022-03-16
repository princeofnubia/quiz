import parseHTML from "html-react-parser";

const QuestionBody = (props) => {
  return (
    <div className="flex flex-col items-center justify-between h-80 my-3">
      <div>
        <h1 className="font-bold text-3xl"> {props.category} </h1>
      </div>
      <div>
        <h2 className="font-bold text-2xl break-normal w-80 mx-auto">
          {" "}
          {parseHTML(props.question)}{" "}
        </h2>
      </div>
      <div>
        <h2 className="font-bold mb-4">
          {" "}
          {props.count + 1} of {props.total}{" "}
        </h2>
      </div>
    </div>
  );
};

export default QuestionBody;
