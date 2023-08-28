import React, { useEffect, useMemo, useState } from "react";
import Start from "./components/start/Start";
import { pricepyramides, questions } from "./data";

import "./App.scss";
import Timer from "./components/timer/Timer";
import Questionbar from "./components/questionbar/Questionbar";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0");
  const pricePyramideDependences = useMemo(() => {
    pricepyramides;
  }, []);
  useEffect(() => {
    questionNumber > 1 &&
      setEarnedMoney(
        pricepyramides.find((m) => m.id === questionNumber - 1).price
      );
  }, [questionNumber, pricePyramideDependences]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          {" "}
          <div className="main">
            <div className="container">
              {stop ? (
                <h1>You earned: ₹ {earnedMoney}</h1>
              ) : (
                <div className="box">
                  <Timer setStop={setStop} questionNumber={questionNumber} />
                  <Questionbar
                    questions={questions}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="pyramide">
            {pricepyramides.map((pricepyramide) => (
              <div
                className={
                  questionNumber === pricepyramide.id
                    ? "pricepyramide active"
                    : "pricepyramide"
                }
                key={pricepyramide.id}
              >
                <span className="counttag">{pricepyramide.id}</span>
                <span className="pricetag">₹ {pricepyramide.price}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
