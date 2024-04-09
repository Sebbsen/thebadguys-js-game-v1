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

    const [isSelected, setIsSelected] = useState(false);

    const handleBuyBuilding = () => {
        dispatch({ type: 'updateIsBuilding', payload: type });
    };


    // set isBuilding to false when escape key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isBuilding) {
            dispatch({ type: 'updateIsBuilding', payload: '' });
        }
    };

    // listen for escape key press
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isBuilding]);


    useEffect(() => {
        if (isBuilding === type) {
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
                const newBuildingModel = new buildingModel({ id: tileClickedCoords.coords });
                GameState.addEntity(newBuildingModel);
                
                if (newBuildingModel.checkForAutoWork) {
                    newBuildingModel.checkForAutoWork();
                }
                
                GameState.editMap(tileClickedCoords.coords.split('-'), tileType);
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
            <img
                src={img} 
                alt={name}
                style={{
                    width: '50px',
                    height: '50px',
                }}
            />
            {isBuilding === type ? (
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
