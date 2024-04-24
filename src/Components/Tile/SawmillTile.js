import React from 'react';
import MainTileAsset from '../../assets/sawmill_building.png';
import GrassTileImg from '../../assets/grass_tile.png';

const SawmillTile = () => {
    return (
        <div
        style={{
            backgroundColor: "#e0a76c",
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
                opacity: .3,
                imageRendering: "pixelated",
            }} 
        />
        <img
            width="100%"
            height="auto"
            src={MainTileAsset}
            style={{
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                pointerEvents: "none",
                transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1)"
            }} 
        />
        </div>
    );
};

export default SawmillTile;