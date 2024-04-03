import './App.css';
import React, { useState } from 'react';
import { ReactContextProvider } from './state/ReactContext';
import { GameContent } from './Components/GameContent/GameContent'; 
import { GameUi } from './Components/GameUi/GameUi';
import AlertPopup from './Components/GameUi/AlertPopup/AlertPopup';

function App() {
  return (
    <ReactContextProvider>
      <AlertPopup />
      <GameUi />
      <GameContent />
    </ReactContextProvider>
  );
}

export default App;
