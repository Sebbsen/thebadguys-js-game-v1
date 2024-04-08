import React, { useEffect, useState, useContext } from 'react';
import { MyReactState }  from '../../../state/ReactContext';
import { BuyBuildingItem } from '../BuyBuildingItem/BuyBuildingItem';

import LumberjackHutModel from '../../../models/LumberjackHutModel';

import LumberjackHutImg from '../../../assets/lumberjack_hut_building.png';

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

  const buildingsToBuy = [
    {
      buildingModel: LumberjackHutModel,
      type: 'LumberjackHut',
      name: 'Lumberjack Hut',
      img: LumberjackHutImg,
      tileType: 'L',
      buildResources: [
          {type: 'wood', cost: 13},
      ],
      productionInput: [
        {type: 'testInput', cost: 1},
      ],
      productionOutput: [
        {type: 'testOutput', cost: 2},
      ],
    },
  ];


  return (
    <div id="buildingMenu" style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        pointerEvents: 'all',
    }}>
      Buy Buildings:
      {buildingsToBuy.map((building, index)=>{
        return (
          <div key={index}>
          <BuyBuildingItem  
            buildingModel={building.buildingModel}
            type={building.type}
            name={building.name}
            img={building.img}
            tileType={building.tileType}
            buildResources={building.buildResources}
            productionInput={building.productionInput}
            productionOutput={building.productionOutput}
          />
          </div>
        )
      })}
    </div>
  );
};
