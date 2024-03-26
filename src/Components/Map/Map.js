import React from 'react';
import map from '../../mapArray.json';
import Tile from '../Tile/Tile';


export const Map = ({children}) => {
  const tileSize = '25px';
  const mapSize = '800px';
  

  return (
    <div style={{
        gridTemplate: `repeat(auto-fill, ${tileSize}) / repeat(auto-fill, ${tileSize})`,
        width: mapSize,
        height: mapSize,
        backgroundColor: 'white',
        display: "grid",
        transform: "rotateX(55deg) rotateZ(45deg)",
    }}>
        {children}
        {map.map((row, rowIndex) => (
            row.map((tile, columnIndex) => (
                <div 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                    }}
                >
                    <Tile 
                        key={`${rowIndex}-${columnIndex}`}
                        tileType={tile}
                        coordinates={[columnIndex,rowIndex]}
                    />
                </div>
            ))
        ))}
    </div>
  );
};
