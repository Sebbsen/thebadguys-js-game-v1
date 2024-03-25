import React, { useReducer, createContext } from 'react';

const initialState = {
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

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
