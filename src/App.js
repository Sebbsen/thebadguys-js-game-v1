import './App.css';
import React, { useState } from 'react';
import { ReactContextProvider } from './state/ReactContext';
import { GameContent } from './Components/GameContent/GameContent'; 
import { GameUi } from './Components/GameUi/GameUi';

function App() {
  return (
    <ReactContextProvider>
      <GameUi />
      <GameContent />
    </ReactContextProvider>
  );
}

export default App;
