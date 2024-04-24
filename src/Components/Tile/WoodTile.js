import React, { useEffect, useState } from 'react';
import GameState from '../../state/GameManager';

import GrassTileImg from '../../assets/grass_tile.png';

const WoodTile = ({id, coords}) => {
    // State to hold the wood value
    const [entitiy, setEntity] = useState(GameState.getEntityById(id));

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
        GameState.removeObserver(`entityEdited${entitiy.id}`, entityObserver);
        };
    }, [id, entitiy?.id]);

    return (
        //console.log('rerender wood:', entitiy?.id),
        <div
        style={{
            backgroundColor: "#416626",
            width: "100%",
            height: "100%",
            position: "relative",
        }}
        >
            <img
                width="100%"
                height="auto"
                src={GrassTileImg}
                alt=""
                style={{
                    opacity: .9,
                    imageRendering: "pixelated",
                }} 
            />
            <img
                width="100%"
                height="auto"
                src="https://static.wikia.nocookie.net/ageofempires/images/c/c7/Trees_aoe2de.png"
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
                <div style={
                    {
                        position: "absolute",
                        zIndex: 2,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.5rem",
                    }
                
                }>
                    {entitiy?.remainingResource || "E"}
                </div>
        </div>
    );
};

export default WoodTile;