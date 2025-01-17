import React from 'react';
import './../App.css';

const EndScreen = ({ score, timer, onRestart, onBack }) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  
  return (
    <div className="end-screen">
      <h2>Game Over!</h2>
      <div className="stats">
        <p>Score: {score}</p>
        <p>Time Played: {minutes}:{seconds.toString().padStart(2, '0')}</p>
      </div>
      <div className="actions">
        <button className="btn play-again" onClick={onRestart}>
          Play Again
        </button>
        <button className="btn back" onClick={onBack}>
          Back 
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
