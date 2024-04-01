import React, { useContext } from 'react';
import GameState  from '../../../state/GameManager';

export const BuildingMenu = () => {
  GameState.getWood()

  const removeWood = () => {
    GameState.removeWood(10)
  }

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
        >Buy Building</div> 
    </div>
  );
};
