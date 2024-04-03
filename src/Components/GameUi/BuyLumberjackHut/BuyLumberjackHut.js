import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../../state/GameManager';
import { MyReactState } from '../../../state/ReactContext';
import LumberjackHutModel from '../../../models/LumberjackHutModel';

export const BuyLumberjackHut = () => {

    const buildingData = {
        buildingModel: LumberjackHutModel,
        name: 'Lumberjack Hut',
        buildResource: 'wood',
        productionInput: null,
        productionOutput: 'wood',
        cost: 13,
        TileType: 'L',
    }
    //TODO: make buildResource an array of resources with cost

    const { dispatch, state } = useContext(MyReactState);
    const { tileClickedCoords } = state;
    const { isBuilding } = state;

    // State to hold the wood value
    const [wood, setWood] = useState(GameState.getWood());

    const handleBuyBuilding = () => {
        dispatch({ type: 'updateIsBuilding', payload: true });
    };

    // buildingTile
    useEffect(() => {
        if (isBuilding) {
            if (wood >= buildingData.cost) {
                // buy building
                GameState.removeWood(buildingData.cost);

                // building
                const newLumberjackHut = new buildingData.buildingModel({ id: tileClickedCoords }); // create new building
                GameState.addEntity(newLumberjackHut); // add building to GameState
                newLumberjackHut.checkForAutoWork(); // check if building can work
                GameState.editMap(tileClickedCoords.split('-'), buildingData.TileType); // add to map
            } else {
                dispatch({ type: 'showAlert', payload: `Not enough ${buildingData.resource}` });
                return;
            }
        }
    }, [tileClickedCoords]);

    // useEffect to add observer to GameState
    useEffect(() => {
        // What to do when the observer is triggered
        const woodObserver = {
            update: () => {
                setWood(GameState.getWood());
            }
        };

        // add observer to GameState
        GameState.addObserver(`${buildingData.buildResource}Changed`, woodObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver(`${buildingData.buildResource}Changed`, woodObserver);
        };
    }, []);

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
