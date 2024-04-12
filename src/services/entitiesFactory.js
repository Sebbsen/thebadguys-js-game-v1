// Ground tiles
// Ressource tiles
import WoodModel from '../models/WoodModel';
import IronModel from '../models/IronModel';
// Building tiles
import LumberjackHutModel from '../models/LumberjackHutModel';
import IronMinercampModel from '../models/IronMinercampModel';
import SawmillModel from '../models/SawmillModel';
import PathModel from '../models/PathModel';
import BaseModel from '../models/BaseModel';

export const getEntities = (mapMatrix) => {
    const entities = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            const tileID = `${rowIndex}-${columnIndex}`;
            switch (tile) {
                // Ground tiles
                // Ressource tiles
                case 'W':
                    entities.push(new WoodModel({id: tileID}));
                    break;
                case 'I':
                    entities.push(new IronModel({id: tileID}));
                    break;
                // Building tiles
                case 'L':
                    entities.push(new LumberjackHutModel({id: tileID}));
                    break;
                case 'S':
                    entities.push(new SawmillModel({id: tileID}));
                    break;
                case 'IM':
                    entities.push(new IronMinercampModel({id: tileID}));
                    break;
                case 'P':
                    entities.push(new PathModel({id: tileID}));
                    break;
                case 'B':
                    entities.push(new BaseModel({id: tileID}));
                    break;
                default:
                    break;
            }
        });
    });
    return entities;
}