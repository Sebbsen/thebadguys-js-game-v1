import React, { useContext } from 'react';
import { GameContext } from '../../GameContext';

export const GameUi = () => {
  const { state, dispatch } = useContext(GameContext);

  const collectWood = () => {
    dispatch({ type: 'ADD_WOOD', payload: 1 });
  };

  return (
    <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
    }}>
      <p>Woods: {state.wood}</p>
      <button onClick={collectWood}>Collect Wood</button>
      
    </div>
  );
};
