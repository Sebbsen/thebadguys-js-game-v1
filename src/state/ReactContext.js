import React, { createContext, useReducer } from 'react';

export const MyReactState = createContext();

const initialState = { 
    tileClickedCoords: '',
    isBuilding: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateTileClickedCoords':
      return { ...state, tileClickedCoords: action.payload};
    case 'updateIsBuilding':
      return { ...state, isBuilding: action.payload};
    default:
      throw new Error();
  }
}

export const ReactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyReactState.Provider value={{ state, dispatch }}>
      {children}
    </MyReactState.Provider>
  );
};