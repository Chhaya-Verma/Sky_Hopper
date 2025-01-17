import React from 'react';
import './../App.css';

const Pillars = ({ x, topHeight, bottomHeight, pillarImg }) => {
  return (
    <div>
      {/* Top Pillar */}
      <div
        className="pillar top"
        style={{
          left: `${x}px`,
          height: `${topHeight}px`,
          backgroundImage: `url(${pillarImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom', // Ensures proper alignment for the top pillar
        }}
      />
      {/* Bottom Pillar */}
      <div
        className="pillar bottom"
        style={{
          left: `${x}px`,
          height: `${bottomHeight}px`,
          backgroundImage: `url(${pillarImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top', // Ensures proper alignment for the bottom pillar
        }}
      />
    </div>
  );
};

export default Pillars;
