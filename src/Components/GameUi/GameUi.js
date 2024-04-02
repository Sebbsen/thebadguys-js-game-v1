import React, { useState, useEffect } from 'react';
import GameState from '../../state/GameManager';
import { BuildingMenu } from './BuildingMenu/BuildingMenu';

export const GameUi = () => {
  // State to hold the wood value
  const [wood, setWood] = useState(GameState.getWood());

  const collectWood = () => {
    GameState.addWood(10);
    console.log('Wood collected', GameState.getWood());
  };

  useEffect(() => {
    // What to do when the observer is triggered
    const woodObserver = {
      update: () => {
        setWood(GameState.getWood());
      }
    };

    // add observer to GameState
    GameState.addObserver('woodChanged', woodObserver);

    // removeObserver if component is unmounted
    return () => {
      GameState.removeObserver('woodChanged', woodObserver);
    };
  }, []);

  return (
    <div id="gameUi" style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    }}>
      <p>Wood: {wood}</p>
      <button onClick={collectWood}>Collect Wood</button>
      <BuildingMenu />
    </div>
  );
};
