import React, { createContext, useReducer } from 'react';

export const MyReactState = createContext();

const initialState = { 
  alert: { message: '', isVisible: false },
  tileClickedCoords: '',
  isBuilding: '',
};

function reducer(state, action) {
  switch (action.type) {
    // Building
    case 'updateTileClickedCoords':
      return { ...state, tileClickedCoords: {coords: action.payload, timestamp: Date.now()}};
    case 'updateIsBuilding':
      return { ...state, isBuilding: action.payload};
    // Alert
    case 'showAlert':
      return { ...state, alert: { message: action.payload, isVisible: true } };
    case 'hideAlert':
      return { ...state, alert: { message: '', isVisible: false } };
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