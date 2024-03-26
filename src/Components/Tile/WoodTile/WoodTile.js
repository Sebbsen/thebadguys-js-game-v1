import React from 'react';

const WoodTile = () => {
    return (
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
            src="https://www.textures.com/system/gallery/photos/Nature/Grass/50178/Grass0140_1_350.jpg" 
            style={{
                opacity: .9,
            }} 
        />
        <img
            width="100%"
            height="auto"
            src="https://static.wikia.nocookie.net/ageofempires/images/c/c7/Trees_aoe2de.png" 
            style={{
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                pointerEvents: "none",
                transform: "rotateZ(-45deg) rotateX(-55deg) scale(1.1, 3.1) translate(-2px, -6px)"
            }} 
        />
        </div>
    );
};

export default WoodTile;