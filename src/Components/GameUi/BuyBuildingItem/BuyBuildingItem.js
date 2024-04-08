import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../../state/GameManager';
import { MyReactState } from '../../../state/ReactContext';


export const BuyBuildingItem = ({
    buildingModel, 
    type = '', 
    name = '',
    img = '',
    tileType = '',
    buildResources = [], 
    productionInput = [],
    productionOutput = []
}) => {

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
            const hasAllResources = buildResources.every(resource =>
                currentResources[resource.type] >= resource.cost
            );

            if (hasAllResources) {
                // Deduct the cost of each resource
                buildResources.forEach(resource => {
                    GameState.changeResource(resource.type, -resource.cost);
                });

                // Proceed with building
                const newLumberjackHut = new buildingModel({ id: tileClickedCoords });
                GameState.addEntity(newLumberjackHut);
                newLumberjackHut.checkForAutoWork();
                GameState.editMap(tileClickedCoords.split('-'), tileType);
            } else {
                // Not enough resources alert
                dispatch({ type: 'showAlert', payload: 'Not enough resources' });
                return;
            }
        }
    }, [tileClickedCoords]); 
    //TODO: fix bug, where building cant place on a tile that clicked, when not enough resources
    // --> tileClickedCoords is not updated, when clicked on the same tile again

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: 'lightblue',
                cursor: 'pointer',
            }}
            onClick={handleBuyBuilding}
        >
            <img
                src={img} 
                alt={name}
                style={{
                    width: '50px',
                    height: '50px',
                }}
            />
            {isBuilding ? (
                <div>Place {name}</div>
            ) : (
                <div>
                    <div>{name}</div>
                    <div>
                        Input: 
                        {productionInput.map((input, index) => (
                            <div key={index}>{input.type}: {input.cost}</div>
                        ))}
                    </div>
                    <div>
                        Output: 
                        {productionOutput.map((output, index) => (
                            <div key={index}>{output.type}: {output.cost}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
