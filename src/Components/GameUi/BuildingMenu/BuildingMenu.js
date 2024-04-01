import React, { useEffect, useState } from 'react';
import GameState  from '../../../state/GameManager';

export const BuildingMenu = () => {

  // State to hold the wood value
  const [wood, setWood] = useState(GameState.getWood());

  const removeWood = () => {
    GameState.removeWood(13);
    console.log('Wood spend', 13);
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
    <div id="buildingMenu" style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',

    }}>
        <div 
            style={{
                padding: '20px',
                backgroundColor: 'lightblue',
                cursor: 'pointer',
            }}
            onClick={removeWood} 
        >
            {wood >= 13 ? 'Buy Building' : 'Need more wood'}
        </div> 
    </div>
  );
};
