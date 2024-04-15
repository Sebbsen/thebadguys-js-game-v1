import React, { useContext, useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';
import { MyReactState } from '../../../state/ReactContext';

export const DismantleBuilding = ({buildingTypes = []}) => {
    const { dispatch, state } = useContext(MyReactState);
    const { tileClickedCoords } = state;
    const [dismantleClicked, setDismantleClicked] = useState(false);

    const handleDismantleBuilding = () => {
        setDismantleClicked(!dismantleClicked);
        dispatch({ type: 'updateIsDismantling', payload: !dismantleClicked });
    };

    // set dismantleClicked to false when escape key is pressed
    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && dismantleClicked) {
            setDismantleClicked(false);
            dispatch({ type: 'updateIsDismantling', payload: false });
        }
    };

    // listen for escape key press
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [dismantleClicked]);

    useEffect(() => {
        if (dismantleClicked) {
            const entity = GameState.getEntityById(tileClickedCoords.coords);
            if (entity) {
                const buildingType = buildingTypes.find(b => b.type === entity.type);
                if (buildingType) {
                    // Give back the resources
                    buildingType.buildResources.forEach(resource => {
                        GameState.changeResource(resource.type, resource.cost);
                    });

                    // Remove the building
                    GameState.removeEntity(entity);
                    GameState.editMap(tileClickedCoords.coords.split('-'), 'E');
                } else {
                    dispatch({ type: 'showAlert', payload: 'Unknown building type' });
                }
            } else {
                dispatch({ type: 'showAlert', payload: 'No building at this location' });
            }
        }
    }, [tileClickedCoords]);

    return (
        <button onClick={handleDismantleBuilding}>
            Dismantle Building
        </button>
    );
};