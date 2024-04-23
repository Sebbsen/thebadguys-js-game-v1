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

    // zoom and pan
    const [scale, setScale] = useState(3.5);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case '+':
                    setScale(prevScale => prevScale + 0.5);
                    break;
                case '-':
                    setScale(prevScale => prevScale - 0.5);
                    break;
                case 'ArrowRight':
                    setTranslate(prevTranslate => ({ ...prevTranslate, x: prevTranslate.x - 5 }));
                    break;
                case 'ArrowLeft':
                    setTranslate(prevTranslate => ({ ...prevTranslate, x: prevTranslate.x + 5 }));
                    break;
                case 'ArrowUp':
                    setTranslate(prevTranslate => ({ ...prevTranslate, y: prevTranslate.y + 5 }));
                    break;
                case 'ArrowDown':
                    setTranslate(prevTranslate => ({ ...prevTranslate, y: prevTranslate.y - 5 }));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
  
  

  return (
    <div style={{
        transform: `translate(${translate.x}%, ${translate.y}%) scale(${scale})`,
        transition: 'transform 0.1s',
    }}>
        <div style={{
            gridTemplate: `repeat(auto-fill, ${tileSize}) / repeat(auto-fill, ${tileSize})`,
            width: mapSize,
            height: mapSize,
            backgroundColor: 'white',
            display: "grid",
            transform: "rotateX(60deg) rotateZ(45deg)",
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
                            id={`${rowIndex}-${columnIndex}`}
                            coords={[columnIndex,rowIndex]}
                        />
                    </div>
                ))
            ))}
        </div>
    </div>
  );
};
