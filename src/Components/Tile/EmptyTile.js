import React from 'react';

const EmptyTile = () => {
    return (
        <div
        style={{
            backgroundColor: "#e0a76c",
            width: "100%",
            height: "100%",
        }}
        >
            <img
                width="100%"
                height="auto"
                src="./grass_tile.webp" 
                style={{
                    imageRendering: "pixelated",
                    opacity: .3,
                }} 
            />   
        </div>
    );
};

export default EmptyTile;