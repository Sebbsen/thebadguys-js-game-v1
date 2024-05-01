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

export const BuildingMenu = () => {
  const { dispatch, state } = useContext(MyReactState);
  const { isBuilding } = state;

  const buildingsToBuy = [
    {
      buildingModel: PathModel,
      type: 'path',
      name: 'Path',
      img: './path_building.png',
      tileType: 'P',
      buildResources: [
          {type: 'wood', cost: 5},
      ],
    },
    {
      buildingModel: LumberjackHutModel,
      type: 'lumberjackhut',
      name: 'Lumberjack Hut',
      img: './lumberjack_hut_building.png',
      tileType: 'L',
      buildResources: [
          {type: 'wood', cost: 25},
      ],
      productionOutput: [
        {type: 'wood', cost: 1},
      ],
    },
    {
      buildingModel: SawmillModel,
      type: 'sawmill',
      name: 'Sawmill',
      img: '././sawmill_building.png',
      tileType: 'S',
      buildResources: [
          {type: 'wood', cost: 40},
      ],
      productionInput: [
        {type: 'wood', cost: 2},
      ],
      productionOutput: [
        {type: 'planks', cost: 1},
      ],
    },
    {
      buildingModel: MinercampModel,
      type: 'minercamp',
      name: 'Minercamp',
      img: './minercamp_building.png',
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
      img: './iron_smelter_building.png',
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
      img: './gold_smelter_building.png',
      tileType: 'GS',
      buildResources: [
          {type: 'planks', cost: 45},
          {type: 'gold', cost: 35},
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
      img: './factory_building_v2.webp',
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
