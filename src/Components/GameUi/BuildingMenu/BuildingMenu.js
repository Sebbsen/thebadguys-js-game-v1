import React, { useEffect, useState, useContext } from 'react';
import { MyReactState }  from '../../../state/ReactContext';
import { BuyLumberjackHut } from '../BuyLumberjackHut/BuyLumberjackHut';

export const BuildingMenu = () => {
  const { dispatch, state } = useContext(MyReactState);
  const { isBuilding } = state;

  // set isBuilding to false when escape key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isBuilding) {
      dispatch({ type: 'updateIsBuilding', payload: false });
    }
  };

  // listen for escape key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBuilding]);


  return (
    <div id="buildingMenu" style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',

    }}>
      Buy Buildings:
      <BuyLumberjackHut />
    </div>
  );
};
