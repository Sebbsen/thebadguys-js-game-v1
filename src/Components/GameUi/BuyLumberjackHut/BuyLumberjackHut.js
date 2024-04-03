import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../../state/GameManager';
import { MyReactState } from '../../../state/ReactContext';
import LumberjackHutModel from '../../../models/LumberjackHutModel';

export const BuyLumberjackHut = () => {
    const buildingData = {
        buildingModel: LumberjackHutModel,
        name: 'Lumberjack Hut',
        buildResources: [
            {type: 'wood', cost: 13},
        ],
        productionInput: null,
        productionOutput: 'wood',
        TileType: 'L',
    };

    const { dispatch, state } = useContext(MyReactState);
    const { tileClickedCoords } = state;
    const { isBuilding } = state;

    const handleBuyBuilding = () => {
        dispatch({ type: 'updateIsBuilding', payload: true });
    };

    useEffect(() => {
        if (isBuilding) {
            const currentResources = GameState.getResources();

            // Check if the player has enough of each resource
            const hasAllResources = buildingData.buildResources.every(resource =>
                currentResources[resource.type] >= resource.cost
            );

            if (hasAllResources) {
                // Deduct the cost of each resource
                buildingData.buildResources.forEach(resource => {
                    GameState.changeResource(resource.type, -resource.cost);
                });

                // Proceed with building
                const newLumberjackHut = new buildingData.buildingModel({ id: tileClickedCoords });
                GameState.addEntity(newLumberjackHut);
                newLumberjackHut.checkForAutoWork();
                GameState.editMap(tileClickedCoords.split('-'), buildingData.TileType);
            } else {
                // Not enough resources alert
                dispatch({ type: 'showAlert', payload: 'Not enough resources' });
                return;
            }
        }
    }, [tileClickedCoords]);

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: 'lightblue',
                cursor: 'pointer',
            }}
            onClick={handleBuyBuilding}
        >
            {isBuilding ? (
                <div>Place {buildingData.name}</div>
            ) : (
                <div>{buildingData.name}</div>
            )}
        </div>
    );
};
