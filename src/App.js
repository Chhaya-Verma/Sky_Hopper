// import React from "react";
// import FrontPage from "./components/FrontPage";
// import ImageSlider from "./components/ImageSlider";
// function App() {
//   return (
//     <div className="App">
//       <FrontPage />
//       <ImageSlider />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import ImageSlider from "./components/ImageSlider";
// import FlappyBird from "./components/FlappyBird";
import Game from "./components/Game";
import { AudioProvider } from "./components/AudioContext";
import "./App.css";

function App() {
  return (
    // Wrap everything inside AudioProvider
    <AudioProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/slider" element={<ImageSlider />} />
            {/* <Route path="/flappybird" element={<FlappyBird />} /> */}
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
