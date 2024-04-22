import React from 'react';
import { Map } from '../Map/Map';

export const GameContent = () => {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black',
    }}> 
      <Map>      
      </Map> 
    </div>
  );
};
