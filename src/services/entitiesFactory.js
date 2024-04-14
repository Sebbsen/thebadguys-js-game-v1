// Ground tiles
// Ressource tiles
import WoodModel from '../models/WoodModel';
import IronModel from '../models/IronModel';
import GoldModel from '../models/GoldModel';
// Building tiles
import LumberjackHutModel from '../models/LumberjackHutModel';
import MinercampModel from '../models/MinercampModel';
import SawmillModel from '../models/SawmillModel';
import IronSmelterModel from '../models/IronSmelterModel';
import GoldSmelterModel from '../models/GoldSmelterModel';
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
                case 'G':
                    entities.push(new GoldModel({id: tileID}));
                    break;
                // Building tiles
                case 'L':
                    entities.push(new LumberjackHutModel({id: tileID}));
                    break;
                case 'S':
                    entities.push(new SawmillModel({id: tileID}));
                    break;
                case 'IS':
                    entities.push(new IronSmelterModel({id: tileID}));
                    break;
                case 'IS':
                    entities.push(new GoldSmelterModel({id: tileID}));
                    break;
                case 'IM':
                    entities.push(new MinercampModel({id: tileID}));
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