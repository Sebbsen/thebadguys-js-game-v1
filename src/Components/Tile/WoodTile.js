import React, { useEffect, useState, useRef } from 'react';
import GameState from '../../state/GameManager';

const WoodTile = ({id, coords}) => {
    // State to hold the wood value
    const [entitiy, setEntity] = useState(GameState.getEntityById(id));
    const [treeImage, setTreeImage] = useState('./tree_tile_state1.webp');
    const harvestInterval = useRef();

    useEffect(() => {
        // What to do when the observer is triggered
        const entityObserver = {
            update: () => {
                setEntity(prevEntity => ({ ...prevEntity, ...GameState.getEntityById(id)}));
            }
        };

        // add observer to GameState
        GameState.addObserver(`entityEdited${entitiy.id}`, entityObserver);

        // removeObserver if component is unmounted
        return () => {
            clearInterval(harvestInterval.current);
            GameState.removeObserver(`entityEdited${entitiy.id}`, entityObserver);
        };
    }, [id, entitiy?.id]);
    

    useEffect(() => {
        let imageSrc = '';
        if (entitiy.remainingResource === 50) {
            imageSrc = './tree_tile_state1.webp';
        } else if (entitiy.remainingResource < 50 && entitiy.remainingResource > 25) {
            imageSrc = './tree_tile_state2.webp';
        } else {
            imageSrc = './tree_tile_state3.webp';
        }
        setTreeImage(imageSrc);
    }, [entitiy]);

    const manualHarvest = () => {
        harvestInterval.current = setInterval(() => {
            GameState.HarvestWood(id,1);
        },1000);
    }

    const cancelHarvest = () => {
        clearInterval(harvestInterval.current);
        console.log('cancelHarvest');
    }

    return (
        //console.log('rerender wood:', entitiy?.id),
        <div
            style={{
                backgroundColor: "#416626",
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            onMouseDown={manualHarvest}
            onMouseUp={cancelHarvest}
        >
            <img
                width="100%"
                height="auto"
                src="./grass_tile.webp"
                alt=""
                style={{
                    opacity: .9,
                    imageRendering: "pixelated",
                }} 
            />
            <img
                width="100%"
                height="auto"
                src={treeImage}
                alt=""
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1) translate(-2px, -6px)"
                }} 
            />
        </div>
    );
};

export default WoodTile;