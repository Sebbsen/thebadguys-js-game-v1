import React, { useContext }  from 'react';
import { Map } from '../Map/Map';

import { MyReactState } from '../../state/ReactContext';

export const GameContent = () => {

  const { state, dispatch } = useContext(MyReactState);
  const { isDismantling } = state;

  return (
    <div 
      className={`${isDismantling ? 'is-dismantling' : ''}`}
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#4a92c0',
    }}> 
      <Map>      
      </Map> 
    </div>
  );
};
