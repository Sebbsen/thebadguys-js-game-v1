import React, { useEffect, useState, useContext } from 'react';
import GameState  from '../../../state/GameManager';
import { MyReactState }  from '../../../state/ReactContext';
import LumberjackHutModel from '../../../models/LumberjackHutModel';

export const BuildingMenu = () => {
  const { dispatch, state } = useContext(MyReactState);
  const { tileClickedCoords } = state;
  const { isBuilding } = state;

  // State to hold the wood value
  const [wood, setWood] = useState(GameState.getWood());

  const handleBuyBuilding = () => {
    GameState.removeWood(13);
    console.log('Wood spend', 13);
    dispatch({ type: 'updateIsBuilding', payload: true });
  };

  // Event listener for the 'keydown' event
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isBuilding) {
      dispatch({ type: 'updateIsBuilding', payload: false });
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBuilding]);

  // useEffect to log tileClickedCoords
  useEffect(() => {
    if (isBuilding) {
      console.log('Building on tile', tileClickedCoords);
      const newLumberjackHut = new LumberjackHutModel({id: tileClickedCoords});
      GameState.addEntity(newLumberjackHut);
      newLumberjackHut.checkForAutoWork();
      GameState.editMap(tileClickedCoords.split('-'), 'L');

    }
  }, [tileClickedCoords]);

  // useEffect to add observer to GameState
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
            onClick={handleBuyBuilding} 
        >
            {wood >= 13 ? 'Buy Building' : 'Need more wood'}
        </div> 
    </div>
  );
};
