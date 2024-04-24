import React from 'react';


const CompassFactoryTile = () => {
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
                src="./grass_tile.webp"
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
                    src='./factory_building_v2.webp'
                    style={{
                        transform: "translate(0.1px, -2.2px) scale(1.35)"
                    }}
                />
            </div>
        </div>
    );
};

export default CompassFactoryTile;