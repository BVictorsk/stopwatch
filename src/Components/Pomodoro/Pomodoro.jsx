import React, { useState, useEffect } from "react";
import './Pomodoro.css'

const PomodoroTimer = () => {
  const [currentTimer, setCurrentTimer] = useState(25 * 60); // em segundos
  const [timeLeft, setTimeLeft] = useState(currentTimer);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  useEffect(() => {
    setTimeLeft(currentTimer);
  }, [currentTimer]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div className="pomodoro-circle">
      <div className="pomodoro-btn-container">
        <button onClick={() => setCurrentTimer(25 * 60)}>25min</button>
        <button onClick={() => setCurrentTimer(5 * 60)}>5min</button>
        <button onClick={() => setCurrentTimer(15 * 60)}>15min</button>
      </div>
      <div className="display-pomodoro">
        <p>{Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>
      </div>
      <div className="btn-start-stop">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
