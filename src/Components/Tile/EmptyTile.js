import React from 'react';
import GrassTileImg from '../../assets/grass_tile.png';

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
                src={GrassTileImg} 
                style={{
                    imageRendering: "pixelated",
                    opacity: .3,
                }} 
            />   
        </div>
    );
};

export default EmptyTile;