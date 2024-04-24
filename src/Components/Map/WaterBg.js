import React from 'react';
import WaterTileImg from '../../assets/water_tile.png';
import './WaterBg.css';

const WaterBg = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '16000px',
                height: '16000px',
                top: '-8000px',
                left: '-8000px',
                imageRendering: 'pixelated',
                backgroundImage: `url(${WaterTileImg})`,
                backgroundSize: '25px',
                opacity: '0.2',
                //animation: 'flow 10s linear infinite',
            }}
        ></div>
    );
};

export default WaterBg;