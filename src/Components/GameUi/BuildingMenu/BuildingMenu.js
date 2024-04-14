import React, { useEffect, useState, useContext } from 'react';
import { MyReactState }  from '../../../state/ReactContext';
import { BuyBuildingItem } from '../BuyBuildingItem/BuyBuildingItem';

import LumberjackHutModel from '../../../models/LumberjackHutModel';
import MinercampModel from '../../../models/MinercampModel';
import PathModel from '../../../models/PathModel';
import SawmillModel from '../../../models/SawmillModel';
import IronSmelterModel from '../../../models/IronSmelterModel';

import LumberjackHutImg from '../../../assets/lumberjack_hut_building.png';
import PathImg from '../../../assets/4_directions_path.png';

export const BuildingMenu = () => {
  const { dispatch, state } = useContext(MyReactState);
  const { isBuilding } = state;

  const buildingsToBuy = [
    {
      buildingModel: PathModel,
      type: 'path',
      name: 'Path',
      img: PathImg,
      tileType: 'P',
      buildResources: [
          {type: 'wood', cost: 5},
      ],
    },
    {
      buildingModel: LumberjackHutModel,
      type: 'lumberjackhut',
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
      type: 'sawmill',
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
      buildingModel: MinercampModel,
      type: 'minercamp',
      name: 'Minercamp',
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
    {
      buildingModel: IronSmelterModel,
      type: 'ironSmelter',
      name: 'Iron Smelter',
      img: LumberjackHutImg,
      tileType: 'IS',
      buildResources: [
          {type: 'planks', cost: 40},
          {type: 'iron', cost: 30},
      ],
      productionInput: [
        {type: 'wood', cost: 1},
        {type: 'iron', cost: 2},
      ],
      productionOutput: [
        {type: 'ironIngots', cost: 1},
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
