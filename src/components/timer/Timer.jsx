import React, { useEffect, useState } from "react";
import "./Timer.scss";
const Timer = ({ setStop, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return (
    <div className="timer">
      <span>{timer}</span>
    </div>
  );
};

export default Timer;
