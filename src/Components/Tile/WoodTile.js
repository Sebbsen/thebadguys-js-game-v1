import React, { useEffect, useState, useRef } from 'react';
import GameState from '../../state/GameManager';

const WoodTile = ({id, coords}) => {
    // State to hold the wood value
    const [entity, setEntity] = useState(GameState.getEntityById(id));
    const [treeImage, setTreeImage] = useState('./tree_tile_state1.webp');
    const [showVillager, setShowVillager] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [prevResource, setPrevResource] = useState(0);
    const harvestInterval = useRef();

    useEffect(() => {
        // What to do when the observer is triggered
        const entityObserver = {
            update: () => {
                setEntity(prevEntity => ({ ...prevEntity, ...GameState.getEntityById(id)}));
            }
        };

        // add observer to GameState
        GameState.addObserver(`entityEdited${entity.id}`, entityObserver);

        // removeObserver if component is unmounted
        return () => {
            clearInterval(harvestInterval.current);
            GameState.removeObserver(`entityEdited${entity.id}`, entityObserver);
        };
    }, [id, entity?.id, timeoutId]);

    useEffect(() => {
        let imageSrc = '';
        if (entity.remainingResource === 50) {
            imageSrc = './tree_tile_state1.webp';
        } else if (entity.remainingResource < 50 && entity.remainingResource > 25) {
            imageSrc = './tree_tile_state2.webp';
        } else {
            imageSrc = './tree_tile_state3.webp';
        }
        setTreeImage(imageSrc);
    }, [entity]);

    const manualHarvest = () => {
        harvestInterval.current = setInterval(() => {
            GameState.HarvestWood(id,1);
        },1000);
    }

    const cancelHarvest = () => {
        clearInterval(harvestInterval.current);
        console.log('cancelHarvest');
    }

    useEffect(() => {
    const intervalId = setInterval(() => {
        const currentEntity = GameState.getEntityById(id);
        if (currentEntity && currentEntity.remainingResource < currentEntity.totalResource && currentEntity.remainingResource !== prevResource) {
            setShowVillager(true);
            setPrevResource(currentEntity.remainingResource);
        } else {
            setShowVillager(false);
        }
        if(id ==='57-50') {
        }
    }, 3000 * Math.random() + 1500);

    // Cleanup function
    return () => {
        clearInterval(intervalId);
    };
}, [id,prevResource]);

    return (
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
            {showVillager && <img 
                src="./villager_treecut.webp"
                style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '65%',
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1) translate(-4px, 0px)",
                }}
            />}
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