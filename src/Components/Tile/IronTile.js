import React, { useEffect, useState } from 'react';
import GameState from '../../state/GameManager';


const IronTile = ({id, coords}) => {
    const [entity, setEntity] = useState(GameState.getEntityById(id));
    const [scale, setScale] = useState(1); // Add this line

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

    return (
        <div
        style={{
            backgroundColor: "silver",
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
                    transform: `rotateZ(-45deg) rotateX(-45deg) translate(8px ,-5px) scale(${scale})`,
                    filter: "grayscale(100%)"
                }} 
            />
        </div>
    );
};

export default IronTile;