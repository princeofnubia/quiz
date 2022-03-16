import { useState, useEffect } from "react";

const API_URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const useQuestion = () => {
  const [status, setStatus] = useState("notLoaded");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setStatus("loading");
    fetchQuestion();
  }, []);

  async function fetchQuestion() {
    const res = await fetch(API_URL);
    const json = await res.json();
    setQuestions(json.results);
    setStatus("loaded");
  }

  return [questions, status];
};

export default useQuestion;
