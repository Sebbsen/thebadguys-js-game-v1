import WoodModel from '../models/WoodModel';
import LumberjackHutModel from '../models/LumberjackHutModel';
import PathModel from '../models/PathModel';
import BaseModel from '../models/BaseModel';

export const getEntities = (mapMatrix) => {
    const entities = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            const tileID = `${rowIndex}-${columnIndex}`;
            switch (tile) {
                case 'W':
                    entities.push(new WoodModel({id: tileID}));
                    break;
                case 'L':
                    entities.push(new LumberjackHutModel({id: tileID}));
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