import React, { useEffect, useState, useContext } from 'react';
import { MyReactState }  from '../../../state/ReactContext';
import { BuyBuildingItem } from '../BuyBuildingItem/BuyBuildingItem';

import LumberjackHutModel from '../../../models/LumberjackHutModel';
import IronMinercampModel from '../../../models/IronMinercampModel';
import PathModel from '../../../models/PathModel';
import SawmillModel from '../../../models/SawmillModel';

import LumberjackHutImg from '../../../assets/lumberjack_hut_building.png';
import PathImg from '../../../assets/4_directions_path.png';

export const BuildingMenu = () => {
  const { dispatch, state } = useContext(MyReactState);
  const { isBuilding } = state;

  const buildingsToBuy = [
    {
      buildingModel: PathModel,
      type: 'Path',
      name: 'Path',
      img: PathImg,
      tileType: 'P',
      buildResources: [
          {type: 'wood', cost: 5},
      ],
    },
    {
      buildingModel: LumberjackHutModel,
      type: 'LumberjackHut',
      name: 'Lumberjack Hut',
      img: LumberjackHutImg,
      tileType: 'L',
      buildResources: [
          {type: 'wood', cost: 13},
      ],
      productionOutput: [
        {type: 'wood', cost: 1},
      ],
    },
    {
      buildingModel: SawmillModel,
      type: 'Sawmill',
      name: 'Sawmill',
      img: LumberjackHutImg,
      tileType: 'S',
      buildResources: [
          {type: 'wood', cost: 40},
      ],
      productionInput: [
        {type: 'wood', cost: 1},
      ],
      productionOutput: [
        {type: 'Planks', cost: 1},
      ],
    },
    {
      buildingModel: IronMinercampModel,
      type: 'IronMinercamp',
      name: 'Iron Minercamp',
      img: LumberjackHutImg,
      tileType: 'IM',
      buildResources: [
          {type: 'wood', cost: 5},
          {type: 'planks', cost: 50},
      ],
      productionOutput: [
        {type: 'iron', cost: 1},
      ],
    },
  ];


  return (
    <div id="buildingMenu" style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        pointerEvents: 'all',
        display: 'flex',
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
