import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, centiseconds: 0 });
  const [loopTimes, setLoopTimes] = useState([]);
  const intervalRef = useRef(null);

  function startStop() {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          let centiseconds = prevTime.centiseconds + 1;
          let seconds = prevTime.seconds;
          let minutes = prevTime.minutes;
          if (centiseconds === 100) {
            centiseconds = 0;
            seconds += 1;
          }
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
          return { centiseconds, seconds, minutes };
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }

  function reset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({ minutes: 0, seconds: 0, centiseconds: 0 });
    setLoopTimes([]);
  }

  function loop() {
    const currentLoopTime = formatTime();
    setLoopTimes(prevLoopTimes => [...prevLoopTimes, currentLoopTime]);
  }

  function formatTime() {
    return (
      String(time.minutes).padStart(2, '0') +
      ':' +
      String(time.seconds).padStart(2, '0') +
      ':' +
      String(time.centiseconds).padStart(2, '0')
    );
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTime()}</p>
      <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={loop}>Loop</button>
      {loopTimes.length > 0 && (
        <div>
          <h2>Loop times:</h2>
          <ul>
            {loopTimes.map((loopTime, index) => (
              <li key={index}>{loopTime}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
