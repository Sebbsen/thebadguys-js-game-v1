import React, { useState, useEffect } from 'react';
import MainTileAsset from '../../assets/path_building.png';
import GameState from '../../state/GameManager';
import GrassTileImg from '../../assets/grass_tile.png';

const PathTile = ({ id, coords }) => {
    const [neighbours, setNeighbours] = useState(['E', 'E', 'E', 'A ', 'E', 'E', 'E', 'E']);

    useEffect(() => {
        // What to do when the observer is triggered
        const mapObserver = {
            update: () => {
                const newNeighbours = GameState.get4Neighbours(coords[1], coords[0]);
                setNeighbours(newNeighbours);
            }
        };

        // add observer to GameState
        GameState.addObserver(`mapEdited`, mapObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver(`mapEdited`, mapObserver);
        };
    }, [neighbours]);

    useEffect(() => {
        const newNeighbours = GameState.get4Neighbours(coords[1], coords[0]);
        setNeighbours(newNeighbours);
    }, []);


    return (
        <div
            style={{
                backgroundColor: "#e0a76c",
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <img
                width="100%"
                height="auto"
                src={GrassTileImg} 
                style={{
                    opacity: .3,
                    imageRendering: "pixelated",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    width: "3px",
                    height: "3px",
                    zIndex: 3,
                    color: "white",
                    backgroundColor: "grey",
                    transformOrigin: "0% 0%",
                    transform: `translate(-50%, -50%)`,
                    fontSize: "4px",
                    zIndex: 0,
                }}
            >
            </div>
            {neighbours.map((neighbour, index) => {
                if (neighbour !== 'E' && neighbour !== 'W') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: '50%',
                                left: '50%',
                                width: "75%",
                                height: "7px",
                                zIndex: 3,
                                color: "white",
                                transformOrigin: "0% 0%",
                                transform: `rotate(${180 - index * 90}deg) translate(-3.5px, -50%)`,
                                fontSize: "4px",
                                backgroundImage: `url(${MainTileAsset})`,
                                backgroundSize: "100% 100%",
                                zIndex: 0,
                            }}
                        >
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default PathTile;