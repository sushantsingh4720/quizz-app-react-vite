import React, { useRef } from "react";
import "./Start.scss";
const Start = ({ setUsername }) => {
  const inputRef = useRef();

  const startHandler = (e) => {
    e.preventDefault();
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  return (
    <div className="start">
      <form onSubmit={startHandler}>
        <input ref={inputRef} type="text" placeholder="Username" />
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default Start;
