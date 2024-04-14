import React, { useContext } from 'react';
import './Tile.css';

import { MyReactState } from '../../state/ReactContext';

// Ground tiles
import EmptyTile from './EmptyTile';
import WaterTile from './WaterTile';
// Ressource tiles
import WoodTile from './WoodTile';
import IronTile from './IronTile';
import GoldTile from './GoldTile';
// Building tiles
import BaseTile from './BaseTile';
import LumberjackHutTile from './LumberjackHutTile';
import MinercampTile from './MinercampTile';
import IronSmelterTile from './IronSmelterTile';
import SawmillTile from './SawmillTile';
import PathTile from './PathTile';

const Tile = ({ tileType, id, coords }) => {
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
            tileComponent = <WoodTile id={id} coords={coords} />;
            break;
        case 'I':
            tileComponent = <IronTile id={id} coords={coords} />;
            break;
        case 'G':
            tileComponent = <GoldTile id={id} coords={coords} />;
            break;
        // Building tiles
        case 'B':
            tileComponent = <BaseTile />;
            break;
        case 'L':
            tileComponent = <LumberjackHutTile id={id} coords={coords} />;
            break;
        case 'IM':
            tileComponent = <MinercampTile id={id} coords={coords} />;
            break;
        case 'IS':
            tileComponent = <IronSmelterTile id={id} coords={coords} />;
            break;
        case 'S':
            tileComponent = <SawmillTile/>;
            break;
        case 'P':
            tileComponent = <PathTile />;
            break;
        default:
            tileComponent = <div>N</div>;
            break;
    }

    const { state, dispatch } = useContext(MyReactState);

    const handleTileClick = () => {
        dispatch({ type: 'updateTileClickedCoords', payload: id });
    };

    return (
        <div 
            className="tile" 
            data-coords={id} 
            style={{width: "100%", height: "100%"}}
            onClick={handleTileClick}
        >
            {tileComponent}
        </div>
    );
};

export default Tile;