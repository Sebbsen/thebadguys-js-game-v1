import React, { useEffect, useState } from 'react';
import GameState from '../../state/GameManager';

const GoldTile = ({id, coords}) => {
    const [entity, setEntity] = useState(GameState.getEntityById(id));
    const [scale, setScale] = useState(1);
    const [showVillager, setShowVillager] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [prevResource, setPrevResource] = useState(0);

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
            GameState.removeObserver(`entityEdited${entity.id}`, entityObserver);
        };
    }, [id, entity?.id]);

    useEffect(() => {
        let scaleValue = 1 * (entity.remainingResource / entity.totalResource);
        setScale(scaleValue);
    }, [entity]);

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
            backgroundColor: "#f6d343",
            width: "100%",
            height: "100%",
            position: "relative",
        }}
        >
            <img
                width="100%"
                height="auto"
                src="./grass_tile.webp" 
                style={{
                    opacity: .8,
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
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1) translate(-4px, -3px)",
                    zIndex: 2,
                }}
            />}
            <img
                width="100%"
                height="auto"
                src="./gold_iron_ore.webp" 
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '135%',
                    pointerEvents: "none",
                    transform: `rotateZ(-45deg) rotateX(-45deg) translate(8px ,-5px) scale(${scale})`
                }}
                />
        </div>
    );
};

export default GoldTile;