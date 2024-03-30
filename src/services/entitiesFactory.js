import WoodModel from '../models/WoodModel';
import LumberjackHutModel from '../models/LumberjackHutModel';

export const getEntities = (mapMatrix, dispatch) => {
    const entities = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            const tileID = `${rowIndex+1}-${columnIndex+1}`;
            switch (tile) {
                case 'W':
                    entities.push(new WoodModel({id: tileID}));
                    break;
                case 'L':
                    entities.push(new LumberjackHutModel({
                        id: tileID,
                        updateResource: (id, amount) => dispatch({ type: 'UPDATE_ENTITY_RESOURCES', payload: { id, amount } }),
                        collectWood: (amount) => dispatch({ type: 'ADD_WOOD', payload: amount })
                    }));
                    break;
                default:
                    break;
            }
        });
    });
    return entities;
}
