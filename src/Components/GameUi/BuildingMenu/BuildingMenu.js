import React, { useEffect, useState, useContext } from 'react';
import { MyReactState }  from '../../../state/ReactContext';
import { BuyBuildingItem } from './BuyBuildingItem';
import { DismantleBuilding } from './DismantleBuilding';

import LumberjackHutModel from '../../../models/LumberjackHutModel';
import MinercampModel from '../../../models/MinercampModel';
import PathModel from '../../../models/PathModel';
import SawmillModel from '../../../models/SawmillModel';
import IronSmelterModel from '../../../models/IronSmelterModel';
import GoldSmelterModel from '../../../models/GoldSmelterModel';
import CompassFactoryModel from '../../../models/CompassFactoryModel';

import BuildingMenuImg from '../../../assets/buildingmenu.png';

import LumberjackHutImg from '../../../assets/lumberjack_hut_building.png';
import SawmillImg from '../../../assets/sawmill_building.png';
import GoldSmelterImg from '../../../assets/gold_smelter_building.png';
import IronSmelterImg from '../../../assets/iron_smelter_building.png';
import MinercampImg from '../../../assets/minercamp_building.png';
import CompassFactory from '../../../assets/factory_building.png';
import PathImg from '../../../assets/path_building.png';

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
      img: SawmillImg,
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
      img: MinercampImg,
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
      type: 'ironsmelter',
      name: 'Iron Smelter',
      img: IronSmelterImg,
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
    {
      buildingModel: GoldSmelterModel,
      type: 'goldsmelter',
      name: 'Gold Smelter',
      img: GoldSmelterImg,
      tileType: 'GS',
      buildResources: [
          {type: 'planks', cost: 40},
          {type: 'gold', cost: 30},
      ],
      productionInput: [
        {type: 'wood', cost: 1},
        {type: 'gold', cost: 2},
      ],
      productionOutput: [
        {type: 'goldIngots', cost: 1},
      ],
    },
    {
      buildingModel: CompassFactoryModel,
      type: 'compassfactory',
      name: 'Compass Factory',
      img: CompassFactory,
      tileType: 'CF',
      buildResources: [
          {type: 'planks', cost: 300},
          {type: 'ironIngots', cost: 100},
      ],
      productionInput: [
        {type: 'ironIngots', cost: 4},
        {type: 'goldIngots', cost: 2},
      ],
      productionOutput: [
        {type: 'compasses', cost: 1},
      ],
    },
  ];


  return (
    <div id="buildingMenu" style={{
        position: 'absolute',
        left: '50%',
        bottom: '0',
        pointerEvents: 'all',
        transform: 'translate(-50%, 0)',
    }}>
      <img src={BuildingMenuImg} alt="buildingmenu" />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: '50px',
      }}>
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
        <DismantleBuilding buildingTypes={buildingsToBuy}/>
    </div>
  );
};
