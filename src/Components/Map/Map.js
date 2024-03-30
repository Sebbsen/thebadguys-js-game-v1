import React from 'react';
import map from '../../mapMatrix.json';
import Tile from '../Tile/Tile';


export const Map = ({children}) => {
  const tileSize = '25px';
  const mapSize = '800px';
  

  return (
    console.log("render Map"),
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
                        key={`${rowIndex+1}-${columnIndex+1}`}
                        tileType={tile}
                        coords={[columnIndex,rowIndex]}
                        id={`${rowIndex+1}-${columnIndex+1}`}
                    />
                </div>
            ))
        ))}
    </div>
  );
};
