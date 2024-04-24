import React from 'react';
import MainTileAsset from '../../assets/iron_smelter_building.png';
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
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    transform: "rotateZ(-45deg) rotateX(-45deg) scale(1.1, 3.1)"
                }}
            >
                <img
                    width="100%"
                    height="auto"
                    src={MainTileAsset}
                    style={{
                        transform: "translate(0px, -4.6px) scale(1.05)"
                    }}
                />
            </div>
        </div>
    );
};

export default SawmillTile;