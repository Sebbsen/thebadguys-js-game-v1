import React from 'react';
import Tile from '../Tile/Tile';
import GameState from '../../state/GameManager';


export const Map = ({children}) => {
    const map = GameState.getMap();
    const tileSize = `${map.tileSize}px`;
    const mapSize = `${map.mapSize}px`;
    const mapMatrix = map.mapMatrix;
  
  

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
        {mapMatrix.map((row, rowIndex) => (
            row.map((tile, columnIndex) => (
                <div 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                    }}
                >
                    <Tile 
                        key={`${rowIndex}-${columnIndex}`}
                        tileType={tile}
                        id={`${rowIndex+1}-${columnIndex+1}`}
                        coords={[columnIndex+1,rowIndex+1]}
                    />
                </div>
            ))
        ))}
    </div>
  );
};
