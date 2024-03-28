import React from 'react';
import './Tile.css';

// Ground tiles
import EmptyTile from './EmptyTile/EmptyTile';
import WaterTile from './WaterTile/WaterTile';
// Ressource tiles
import WoodTile from './WoodTile/WoodTile';
import IronTile from './IronTile/IronTile';
import TritiumTile from './TritiumTile/TritiumTile';
// Building tiles
import BaseTile from './BaseTile/BaseTile';
import LumberjackHutTile from './LumberjackHutTile/LumberjackHutTile';

const Tile = ({ tileType, coords }) => {
    let tileComponent;

    switch (tileType) {
        // Ground tiles
        case 'E':
            tileComponent = <EmptyTile />;
            break;
        case 'A':
            tileComponent = <WaterTile />;
            break;
        // Ressource tiles
        case 'W':
            tileComponent = <WoodTile />;
            break;
        case 'I':
            tileComponent = <IronTile />;
            break;
        case 'T':
            tileComponent = <TritiumTile />;
            break;
        // Building tiles
        case 'B':
            tileComponent = <BaseTile />;
            break;
        case 'L':
            tileComponent = <LumberjackHutTile />;
            break;
        default:
            tileComponent = <div>N</div>;
            break;
    }

    return <div className="tile" style={{width: "100%", height: "100%"}}>{tileComponent}</div>;
};

export default Tile;