import React, { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";

import wrong from "/music/wrong.mp3";
import correct from "/music/correct.mp3";
import "./Questionbar.scss";
const Questionbar = ({
  questions,
  setStop,
  setQuestionNumber,
  questionNumber,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSetelectedAnswer] = useState(null);
  const [className, setClassName] = useState("");
  const [wrongAnswer] = useSound(wrong);
  const [correctAnswer] = useSound(correct);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const selectedAnswerHandler = (a) => {
    setSetelectedAnswer(a);
    setClassName("active");
    delay(2000, () => setClassName(a.correct ? "correct" : "wrong"));
    delay(4000, () => {
      if (a.correct) {
        correctAnswer();
        delay(4000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSetelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(4000, () => setStop(true));
      }
    });
  };
  const questionDependences = useMemo(() => {
    questions;
  }, []);

  useEffect(() => {
    if (questionNumber > questions.length) setStop(true);
    setQuestion(questions[questionNumber - 1]);
  }, [questionDependences, questionNumber]);
  return question ? (
    <>
      <div className="question">{question.question}</div>
      <div className="answer">
        {question.answers.map((answer, index) => (
          <span
            key={index}
            className={selectedAnswer?.text === answer.text ? className : ""}
            onClick={() => selectedAnswerHandler(answer)}
          >
            {answer.text}
          </span>
        ))}
      </div>
    </>
  ) : (
    ""
  );
};

export default Questionbar;
