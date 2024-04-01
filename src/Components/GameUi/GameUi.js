import React, { useContext } from 'react';
import GameState from '../../state/GameManager';

import { BuildingMenu } from './BuildingMenu/BuildingMenu';

export const GameUi = () => {

  const collectWood = () => {
    GameState.setWood(GameState.getWood() + 1);
    console.log(GameState.getWood());
  };

  return (
    <div id="gameUi" style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    }}>
      <p>Woods: {GameState.getWood}</p>
      <button onClick={collectWood}>Collect Wood</button>
      <BuildingMenu />
    </div>
  );
};
