import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../state/GameManager';
import MainTileAsset from '../../assets/lumberjack_hut_building.png';
import { MyReactState } from '../../state/ReactContext';

const LumberjackHutTile = ({ id, coords }) => {
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
            const currentLumberjackHutEntity = GameState.getEntityById(id)
            const woodEntity = GameState.getEntityById(tileClickedCoords.coords);
            if(woodEntity?.type === 'wood') {
                currentLumberjackHutEntity.addToQueue(woodEntity);
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
                src="https://www.textures.com/system/gallery/photos/Nature/Grass/50178/Grass0140_1_350.jpg"
                style={{
                    opacity: .3,
                }}
            />
            <img
                width="100%"
                height="auto"
                src={MainTileAsset}
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-55deg) scale(1.1, 3.1)"
                }}
            />
        </div>
    );
};

export default LumberjackHutTile;