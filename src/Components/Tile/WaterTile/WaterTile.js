import React, { useState, useEffect } from 'react';

const WaterTile = () => {
    const [currentRandomOpacity, setCurrentRandomOpacity] = useState(Math.random() * (0.6 - 0.2) + 0.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRandomOpacity(Math.random() * (0.6 - 0.2) + 0.2);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#4a92c0",
                width: "100%",
                height: "100%",
            }}
        >
            <img
                width="100%"
                height="auto"
                src="https://media.istockphoto.com/id/997807300/vector/pixel-water-seamless-texture-background-for-mobile-game.jpg?s=612x612&w=0&k=20&c=0dFZGRJxv3vyiVx4MXIZo7WbMY4cp2qNN_847doVSn8="
                style={{
                    opacity: currentRandomOpacity,
                    transition: "opacity 2s",
                }}
            />
        </div>
    );
};


export default WaterTile;