import React, { useEffect, useState } from 'react';
import GameState from '../../state/GameManager';
import GrassTileImg from '../../assets/grass_tile.png';

const GoldTile = ({id, coords}) => {
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
                src={GrassTileImg} 
                style={{
                    opacity: .8,
                    imageRendering: "pixelated",
                }} 
            />
            <img
                width="100%"
                height="auto"
                src="https://static.wikia.nocookie.net/ageofempires/images/4/49/Aoe2de_gold.png" 
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(0.5, 1.5)"
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

export default GoldTile;