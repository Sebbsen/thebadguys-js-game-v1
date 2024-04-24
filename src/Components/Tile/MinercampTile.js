import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../state/GameManager';
import MainTileAsset from '../../assets/minercamp_building.png';
import { MyReactState } from '../../state/ReactContext';
import GrassTileImg from '../../assets/grass_tile.png';

const MinercampTile = ({ id, coords }) => {
    const { dispatch, state } = useContext(MyReactState);
    const { tileClickedCoords } = state;
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsSelected(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (isSelected && tileClickedCoords.coords != coords.reverse().join('-')) {
            const currentMinercampEntity = GameState.getEntityById(id)
            const currentEntity = GameState.getEntityById(tileClickedCoords.coords);
            if (currentEntity.type === 'iron' || currentEntity.type === 'gold') {
                currentMinercampEntity.addToQueue(currentEntity);
            }
        }
    }, [tileClickedCoords]);

    const handleClick = () => {
        if (isSelected) {
            setIsSelected(false);
        } else {
            setIsSelected(true);
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                backgroundColor: isSelected ? 'lightgreen' : "#e0a76c",
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
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1)"
                }}
            >
                <img
                    width="100%"
                    height="auto"
                    src={MainTileAsset}
                    style={{
                        transform: "translate(0px, -4.6px) scale(1.05)"
                    }}
                />
            </div>
        </div>
    );
};

export default MinercampTile;