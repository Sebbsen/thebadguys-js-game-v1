import React, {useState, useEffect} from 'react';
import Tile from '../Tile/Tile';
import GameState from '../../state/GameManager';
import WaterBg from './WaterBg';


export const Map = ({children}) => {
    const [map, setMap] = useState(GameState.getMap());
    const tileSize = `${map.tileSize}px`;
    const mapSize = `${map.mapSize * map.tileSize}px`;
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
    const [translate, setTranslate] = useState({ x: -11, y: -22 });

 

    useEffect(() => {
        const setLowLOD = () => {
            let mapTiles = document.querySelectorAll('#map .tile img')
            mapTiles.forEach(el => {
                el.classList.add('hide')
            })
        }
        
        const setHighLOD = () => {
            let mapTiles = document.querySelectorAll('#map .tile img')
            mapTiles.forEach(el => {
                el.classList.remove('hide')
            })
        }

        const handleKeyDown = (event) => {
            switch (event.key) {
                case '+':
                    setScale(prevScale => {
                        if (prevScale == 1.5) {
                            setHighLOD()
                        } 

                        if (prevScale < 4) {
                            return prevScale + 0.5;
                        } else {
                            return 4;
                        }
                    });
                    break;
                case '-':
                    setScale(prevScale => {
                        if (prevScale-0.5 == 1.5) {
                            setLowLOD()
                        }
                       

                        if (prevScale > 1) {
                            return prevScale - 0.5;
                        } else {
                            return 1;
                        }
                    });
                    break;
                case 'ArrowRight':
                    setTranslate(prevTranslate => ({ ...prevTranslate, x: prevTranslate.x - 3 }));
                    break;
                case 'ArrowLeft':
                    setTranslate(prevTranslate => ({ ...prevTranslate, x: prevTranslate.x + 3 }));
                    break;
                case 'ArrowUp':
                    setTranslate(prevTranslate => ({ ...prevTranslate, y: prevTranslate.y + 3 }));
                    break;
                case 'ArrowDown':
                    setTranslate(prevTranslate => ({ ...prevTranslate, y: prevTranslate.y - 3 }));
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
        transform: `scale(${scale}) translate(${translate.x}%, ${translate.y}%)`,
        transition: 'transform 0.2s',
    }}>
        <div id="map" style={{
            position: "relative",
            gridTemplate: `repeat(auto-fill, ${tileSize}) / repeat(auto-fill, ${tileSize})`,
            width: mapSize,
            height: mapSize,
            display: "grid",
            transform: "rotateX(60deg) rotateZ(45deg)",
        }}>
            <WaterBg />
        
            {children}
            {mapMatrix.map((row, rowIndex) => (
                row.map((tile, columnIndex) => (
                    tile !== 'A' && <div 
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
