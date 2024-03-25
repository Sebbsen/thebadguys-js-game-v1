import React from 'react';
import map from '../../mapArray.json';
import './Map.css';


export const Map = ({children}) => {
  const tileSize = '25px';
  const mapSize = '800px';
  

  return (
    <div class="Map" style={{
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
                tile === "E" ?
                <div
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "#e0a76c",
                    }}
                >
                   
                </div>
                : tile === "A" ?
                <div
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "#4a92c0",
                    }}
                >
                 
                </div>
                : tile === "B" ?
                <div 
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "#c3171f",
                    }}
                >
                  
                </div>: tile === "W" ?
                <div 
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "#416626",
                    }}
                >
                 
                </div>: tile === "I" ?
                <div 
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "silver",
                    }}
                >
                    
                </div>: tile === "T" ?
                <div 
                    className="tile"
                    key={`${rowIndex}-${columnIndex}`} 
                    style={{
                        gridArea: (columnIndex+1) + "/" + (rowIndex+1),
                        backgroundColor: "#f6d343",
                    }}
                >
                   
                </div>:

                <div>ERROR</div>
            ))
        ))}
    </div>
  );
};
