import React from 'react';
import map from '../../mapArray.json';

export const Map = ({children}) => {
  const tileSize = '25px';
  const mapSize = '800px';

  return (
    <div class="Map" style={{
        gridTemplate: `repeat(auto-fill, ${tileSize}) / repeat(auto-fill, ${tileSize})`,
        width: mapSize,
        height: mapSize,
        backgroundColor: 'lightgreen',
        display: "grid",
        transform: "rotateX(55deg) rotateZ(45deg)",
    }}>
        {children}
        {map}
    </div>
  );
};
