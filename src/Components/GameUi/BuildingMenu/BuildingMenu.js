import React, { useContext } from 'react';
import { GameContext } from '../../../state/GameContext';

export const BuildingMenu = () => {
  const { state, dispatch } = useContext(GameContext);

  const removeWood = () => {
    dispatch({ type: 'REMOVE_WOOD', payload: 10 });
  };

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
