/////////current working code before created AudioContext file//////////
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Pillars from './Pillars';
import EndScreen from './EndScreen';
import './../App.css';

import jungleBg from '../Images/jungle.webp';
import junglePillar from '../Images/jungle-pillar.jpg';
import arcticBg from '../Images/arctic.webp';
import arcticPillar from '../Images/arctic-pillar.jpg';
import spaceBg from '../Images/space.webp';
import spacePillar from '../Images/space-pillar.jpg';
import horrorBg from '../Images/horror.jpeg';
import horrorPillar from '../Images/horror-pillar.webp';
import desertBg from '../Images/desert.webp';
import desertPillar from '../Images/desert-pillar.jpg';
import fantasyBg from '../Images/fantasy.webp';
import fantasyPillar from '../Images/fantasy-pillar.webp';
import magicalBg from '../Images/magical.webp';
import magicalPillar from '../Images/magical-pillar.jpg';
import bird from '../Images/bird.png';

const Game = () => {
  const location = useLocation();
  const { selectedTheme} = location.state || {};
  const navigate = useNavigate();

  if (!selectedTheme) {
    console.error("No selected theme or sound passed");
    return <div>Error: No selected theme or sound</div>;
  }

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [birdY, setBirdY] = useState(600);
  const [pillars, setPillars] = useState([]);
  const [pillarSpeed, setPillarSpeed] = useState(5);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const birdRef = useRef(null);
  const audioRef = useRef(null);

  const themeStyles = {
    Jungle: { background: jungleBg, pillar: junglePillar, sound: "/jungleSound.mp3" },
    Arctic: { background: arcticBg, pillar: arcticPillar, sound: "/arcticSound.mp3" },
    Space: { background: spaceBg, pillar: spacePillar, sound: "/space-sound.mp3" },
    Horror: { background: horrorBg, pillar: horrorPillar, sound: "/horror-sound.mp3" },
    Desert: { background: desertBg, pillar: desertPillar, sound: "/desertSound.mp3" },
    Fantasy: { background: fantasyBg, pillar: fantasyPillar, sound: "/fantasySound.mp3" },
    Magical: { background: magicalBg, pillar: magicalPillar, sound: "/magical-sound.mp3" },
  };

  useEffect(() => {
    // Initialize and play audio on selected theme
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = themeStyles[selectedTheme].sound;
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => console.error("Audio play failed: ", error));
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [selectedTheme]);

  useEffect(() => {
    let timerInterval;
    if (isPlaying && !isPaused) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
        if ((timer + 1) % 60 === 0) setPillarSpeed((prev) => prev + 5);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isPlaying, isPaused, timer]);

  useEffect(() => {
    let pillarInterval;
    if (isPlaying && !isPaused) {
      pillarInterval = setInterval(() => {
        const topHeight = Math.random() * 150 + 50;
        const gap = 150;
        const bottomHeight = Math.random() * 150 + 50;
        setPillars((prev) => [
          ...prev,
          { id: Date.now(), x: window.innerWidth, topHeight, bottomHeight: window.innerHeight - (topHeight + gap) },
        ]);
      }, 2000);
    }
    return () => clearInterval(pillarInterval);
  }, [isPlaying, isPaused]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (isPlaying && !isPaused) {
        setPillars((prev) =>
          prev.map((pillar) => ({ ...pillar, x: pillar.x - pillarSpeed })).filter((pillar) => pillar.x > -50)
        );
        checkCollision();
      }
    }, 50);
    return () => clearInterval(gameLoop);
  }, [isPlaying, isPaused, pillars, pillarSpeed]);

  const checkCollision = () => {
    const birdRect = birdRef.current.getBoundingClientRect();
    for (const pillar of pillars) {
      const topRect = { x: pillar.x, y: 0, width: 50, height: pillar.topHeight };
      const bottomRect = { x: pillar.x, y: window.innerHeight - pillar.bottomHeight, width: 50, height: pillar.bottomHeight };
      if (checkOverlap(birdRect, topRect) || checkOverlap(birdRect, bottomRect)) {
        setGameOver(true);
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }
    setScore((prev) => prev + pillars.filter((pillar) => pillar.x === birdRef.current.offsetLeft).length);
  };

  const checkOverlap = (rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimer(0);
    setPillars([]);
    setBirdY(200);
    setPillarSpeed(5);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleKeyPress = (e) => {
    if (!isPlaying || isPaused) return;
    if (e.key === 'ArrowUp' || e.key === ' ') {
      setBirdY((prev) => Math.max(prev - 50, 0));
    } else if (e.key === 'ArrowDown') {
      setBirdY((prev) => Math.min(prev + 50, window.innerHeight - 50));
    }
  };

  const handleBack = () => {
    navigate("/slider");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div
      className="game-container"
      style={{ backgroundImage: `url(${themeStyles[selectedTheme].background})`, backgroundSize: 'cover' }}
      tabIndex="0"
      onKeyDown={handleKeyPress}
    >
      <audio ref={audioRef} loop />
      <Header score={score} timer={timer} onRestart={startGame} onPause={() => setIsPaused((prev) => !prev)} isPaused={isPaused} />
      {!gameOver ? (
        <div
          className="bird"
          ref={birdRef}
          style={{
            top: `${birdY}px`,
            backgroundImage: `url(${bird})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : (
        <EndScreen score={score} timer={timer} onRestart={startGame} onBack={handleBack} />
      )}
      {pillars.map((pillar) => (
        <Pillars key={pillar.id} x={pillar.x} topHeight={pillar.topHeight} bottomHeight={pillar.bottomHeight} pillarImg={themeStyles[selectedTheme].pillar} />
      ))}
    </div>
  );
};

export default Game;
