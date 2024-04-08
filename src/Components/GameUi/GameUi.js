import React from 'react';
import { BuildingMenu } from './BuildingMenu/BuildingMenu';
import { StatusBar } from './StatusBar/StatusBar';

export const GameUi = () => {
  return (
    <div id="gameUi" style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      <StatusBar />
      <BuildingMenu />
    </div>
  );
};
