// import React from 'react';
// import './../App.css';

// const Header = ({ score, timer, onRestart, onPause, isPaused }) => {
//   const minutes = Math.floor(timer / 60);
//   const seconds = timer % 60;

//   return (
//     <div className="header">
//       <div className="info">
//         <div className="score">Score: {score}</div>
//         <div className="timer">
//           Time: {minutes}:{seconds.toString().padStart(2, '0')}
//         </div>
//       </div>
//       <div className="controls">
//         <button className="btn pause" onClick={onPause}>
//           {isPaused ? 'Resume' : 'Pause'}
//         </button>
//         <button className="btn restart" onClick={onRestart}>
//           Restart
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default Header;


import React from 'react';
import './../App.css';
import { useNavigate } from 'react-router-dom'; // Add this line

const Header = ({ score, timer, onRestart, onPause, isPaused }) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const navigate = useNavigate(); // Initialize the navigate function

  const handleBack = () => {
    navigate('/slider'); // Navigate to ImageSlider page
  };

  return (
    <div className="header">
      <div className="info">
        <div className="score">Score: {score}</div>
        <div className="timer">
          Time: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="controls">
        <button className="btn pause" onClick={onPause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button className="btn restart" onClick={onRestart}>
          Restart
        </button>
        <button className="btn back" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Header;
