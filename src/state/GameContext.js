import React, { useReducer, createContext, useMemo, useEffect, useLayoutEffect } from 'react';
import mapMatrix from '../mapMatrix.json';
import { getEntities } from '../services/entitiesFactory';

const initialState = {
    wood: 10,
    iron: 0,
    tritium: 0,
    entities: [],
};


const gameReducer = (state, action) => {
    switch (action.type) {
        // resources
        case 'ADD_WOOD':
            return { ...state, wood: state.wood + action.payload };
        case 'REMOVE_WOOD':
            return { ...state, wood: state.wood - action.payload };
        case 'ADD_IRON':
            return { ...state, iron: state.iron + action.payload };
        case 'REMOVE_IRON':
            return { ...state, iron: state.iron - action.payload };
        case 'ADD_TRITIUM':
            return { ...state, tritium: state.potions + action.payload };
        case 'REMOVE_TRITIUM':
            return { ...state, tritium: state.potions - action.payload };

        // entities
        case 'INIT_ENTITIES':
            return { ...state, entities: action.payload,};
        case 'ADD_ENTITY':
            return { ...state, entities: [...state.entities, action.payload],};
        case 'REMOVE_ENTITY':
            return { ...state, entities: state.entities.filter(entity => entity.id !== action.payload),};
        case 'UPDATE_ENTITY':
            return { ...state, entities: state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity),};
        case 'UPDATE_ENTITY_RESOURCES':
            return {
                ...state,
                entities: state.entities.map(entity =>
                  entity.id === action.payload.id
                    ? { ...entity, remainingResources: entity.remainingResources + action.payload.amount }
                    : entity
                ),
              };
        default:
          return state;
    }
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    useLayoutEffect(() => {
        // add entities to the state
        const entities = getEntities(mapMatrix, dispatch);
        dispatch({ type: 'INIT_ENTITIES', payload: entities });
        console.log("useLayout GameProvider"); //TODO: prüfen warum es 2 mal ausgeführt wird
        
        entities.forEach(entity => {
            if (entity && typeof entity.checkForAutoWork === 'function') {
                entity.checkForAutoWork(entities);
            }
        });
    }, []);

    console.log("after GameProvider"); //TODO: prüfen warum es 6 mal ausgeführt wird

  


    return (
      <GameContext.Provider value={{ state, dispatch }}>
        {children}
      </GameContext.Provider>
    );
};
