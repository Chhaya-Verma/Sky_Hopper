import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";

const FrontPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  // Create an audio object
  const playAudio = () => {
    const audio = new Audio("/woodenbanner.mp3");
    audio.play();
    setIsPlaying(true); // To track if the audio has been played
  };

  const handlePlayClick = () => {
    if (!isPlaying) {
      playAudio(); // Play sound if not already played
    }
    navigate("/slider"); // Navigate to /slider
  };

  return (
    <div className="front-page">
      <div className="banner">
        <h1 className="game-title">SKY HOPPER</h1>
      </div>
      <img
        src="/playbtn.png"
        alt="Play Button"
        className="play-button"
        onClick={handlePlayClick} // Trigger play audio on click
      />
    </div>
  );
};

export default FrontPage;
