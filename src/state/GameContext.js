import React, { useReducer, createContext } from 'react';
import mapMatrix from '../mapMatrix.json';
import WoodModel from '../models/WoodModel';
import LumberjackHutModel from '../models/LumberjackHutModel';

const getEntities = (mapMatrix, dispatch) => {
    const entities = [];
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            if (tile === 'W') {
                entities.push(new WoodModel({id: `${rowIndex+1}-${columnIndex+1}`, totalResource: 10}));
            } else if (tile === 'L') {
                entities.push(new LumberjackHutModel({id: `${rowIndex+1}-${columnIndex+1}`, collectWood: (amount) => dispatch({ type: 'ADD_WOOD', payload: amount })}));
            }
        });
    });
    return entities;
}

const initialState = {
    entities: getEntities(mapMatrix),
    currentGoal: {
        type: 'tritium',
        amount: 1000,
    },
    wood: 10,
    iron: 0,
    tritium: 0,
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WOOD':
            return { ...state, wood: state.wood + action.payload };
        case 'ADD_IRON':
            return { ...state, iron: state.iron + action.payload };
        case 'ADD_TRITIUM':
            return { ...state, tritium: state.potions + action.payload };
        case 'REMOVE_WOOD':
            return { ...state, wood: state.wood - action.payload };
        case 'REMOVE_IRON':
            return { ...state, iron: state.iron - action.payload };
        case 'REMOVE_TRITIUM':
            return { ...state, tritium: state.potions - action.payload };
        default:
          return state;
    }
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
  
    const entities = getEntities(mapMatrix, dispatch);
  
    return (
      <GameContext.Provider value={{ state, dispatch, entities }}>
        {children}
      </GameContext.Provider>
    );
};
