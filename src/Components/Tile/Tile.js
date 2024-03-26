import React from 'react';
import './Tile.css';

import EmptyTile from './EmptyTile/EmptyTile';
import WaterTile from './WaterTile/WaterTile';
import BaseTile from './BaseTile/BaseTile';
import WoodTile from './WoodTile/WoodTile';
import IronTile from './IronTile/IronTile';
import TritiumTile from './TritiumTile/TritiumTile';

const Tile = ({ tileType, coordinates }) => {
    let tileComponent;

    switch (tileType) {
        case 'E':
            tileComponent = <EmptyTile />;
            break;
        case 'A':
            tileComponent = <WaterTile />;
            break;
        case 'B':
            tileComponent = <BaseTile />;
            break;
        case 'W':
            tileComponent = <WoodTile />;
            break;
        case 'I':
            tileComponent = <IronTile />;
            break;
        case 'T':
            tileComponent = <TritiumTile />;
            break;
        default:
            tileComponent = <div>N</div>;
            break;
    }

    return <div className="tile" style={{width: "100%", height: "100%"}}>{tileComponent}</div>;
};

export default Tile;