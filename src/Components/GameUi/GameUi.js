import React, { useContext } from 'react';
import { GameContext } from '../../state/GameContext';

import { BuildingMenu } from './BuildingMenu/BuildingMenu';

export const GameUi = () => {
  const { state, dispatch } = useContext(GameContext);

  const collectWood = () => {
    dispatch({ type: 'ADD_WOOD', payload: 1 });
  };

  return (
    <div id="gameUi" style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    }}>
      <p>Woods: {state.wood}</p>
      <button onClick={collectWood}>Collect Wood</button>
      <BuildingMenu />
    </div>
  );
};
