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
                src="https://www.textures.com/system/gallery/photos/Nature/Grass/50178/Grass0140_1_350.jpg" 
                style={{
                    opacity: .3,
                }} 
            />   
        </div>
    );
};

export default EmptyTile;