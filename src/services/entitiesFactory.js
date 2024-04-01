import WoodModel from '../models/WoodModel';
import LumberjackHutModel from '../models/LumberjackHutModel';

export const getEntities = (mapMatrix) => {
    const entities = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            const tileID = `${rowIndex+1}-${columnIndex+1}`;
            switch (tile) {
                case 'W':
                    entities.push(new WoodModel({id: tileID}));
                    break;
                case 'L':
                    entities.push(new LumberjackHutModel({id: tileID}));
                    break;
                default:
                    break;
            }
        });
    });
    return entities;
}