import React from 'react';

const IronTile = () => {
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
                src="https://www.textures.com/system/gallery/photos/Nature/Grass/50178/Grass0140_1_350.jpg" 
                style={{
                    opacity: .8,
                }} 
            />
            <img
                width="100%"
                height="auto"
                src="https://static.wikia.nocookie.net/ageofempires/images/7/7d/Aoe2de_stone.png" 
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-55deg) scale(0.5, 1.5)"
                }} 
            />
        </div>
    );
};

export default IronTile;