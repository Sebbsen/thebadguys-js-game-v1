import React, {useState, useEffect} from 'react';
import Tile from '../Tile/Tile';
import GameState from '../../state/GameManager';


export const Map = ({children}) => {
    const [map, setMap] = useState(GameState.getMap());
    const tileSize = `${map.tileSize}px`;
    const mapSize = `${map.mapSize}px`;
    const mapMatrix = map.mapMatrix;

    useEffect(() => {
        // What to do when the observer is triggered
        const mapObserver = {
            update: () => {
                setMap(prevMap => ({ ...prevMap, ...GameState.getMap()}));
            }
        };

        // add observer to GameState
        GameState.addObserver(`mapEdited`, mapObserver);

        // removeObserver if component is unmounted
        return () => {
        GameState.removeObserver(`mapEdited`, mapObserver);
        };
    }, [map]);
  
  

  return (
    console.log('rerender map:', map),
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
