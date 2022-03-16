import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import QuizContext from "../context/quizContext";
import QuizScreen from "./QuizScreen";
import ResultScreen from "./ResultScreen";
import HomeScreen from "./HomeScreen";

const QuizApp = () => {
  const store = useState({});
  return (
    <QuizContext.Provider value={store}>
      <Router>
        <div className="flex pb-4 h-full items-center justify-center">
          <Switch>
            <Route path="/quiz/">
              <QuizScreen />
            </Route>
            <Route exact path="/result">
              <ResultScreen />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </QuizContext.Provider>
  );
};

export default QuizApp;
