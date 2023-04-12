import React, { useState, useRef } from 'react';
import './Stopwatch.css'

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
    <div className="stopwatch-container">
      <div className="content-container">
        <div className="stopwatch-content">
          <div className="circle">
            <div className="formatTime-container">
              <p>{formatTime()}</p>
            </div>
          
            <div className="btn-container">
              <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
              <button onClick={reset}>Reset</button>
              <button onClick={loop}>Loop</button>
            </div>
          </div>
        </div>     
        <div className="list-container">
          {loopTimes.length > 0 && (
            <ul>
              {loopTimes.map((loopTime, index) => (
                <li key={index}>{loopTime}</li>
              ))}
            </ul>
          )}
        </div>   
      </div>
      
    </div>
  );
}

export default Stopwatch;
